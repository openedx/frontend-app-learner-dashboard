import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useAnnouncements, useMarkAnnouncementRead } from 'data/hooks';
import NewsAnnouncementsWidget from '.';
import messages from './messages';

jest.mock('data/hooks', () => ({
  useAnnouncements: jest.fn(),
  useMarkAnnouncementRead: jest.fn(),
}));

const renderWidget = () => render(
  <IntlProvider locale="en"><NewsAnnouncementsWidget /></IntlProvider>,
);

const announcementRows = [
  {
    id: 1,
    title: 'New Course Series: Advanced Machine Learning',
    body: 'Learn the fundamentals of React including components, props, state, and hooks.',
    days_ago: 1,
    is_read: false,
  },
  {
    id: 2,
    title: 'Platform Maintenance Scheduled',
    body: 'WerksLearning will undergo scheduled maintenance on April 20th.',
    days_ago: 2,
    is_read: false,
  },
  {
    id: 3,
    title: 'Q2 Learning Goals Now Available',
    body: 'Your manager has assigned Q2 learning goals in the platform.',
    days_ago: 4,
    is_read: true,
  },
];

describe('NewsAnnouncementsWidget', () => {
  let markAnnouncementRead;

  beforeEach(() => {
    markAnnouncementRead = jest.fn();
    useMarkAnnouncementRead.mockReturnValue({ mutate: markAnnouncementRead });
  });

  it('renders a loading spinner while fetching', () => {
    useAnnouncements.mockReturnValue({ data: undefined, isLoading: true, isError: false });
    renderWidget();
    expect(screen.getByText(messages.loading.defaultMessage)).toBeInTheDocument();
  });

  it('renders nothing on error', () => {
    useAnnouncements.mockReturnValue({ data: undefined, isLoading: false, isError: true });
    const { container } = renderWidget();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there are no announcements', () => {
    useAnnouncements.mockReturnValue({
      data: { results: [], unread_count: 0 }, isLoading: false, isError: false,
    });
    const { container } = renderWidget();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the widget title, badge, and each announcement', () => {
    useAnnouncements.mockReturnValue({
      data: { results: announcementRows, unread_count: 2 }, isLoading: false, isError: false,
    });
    renderWidget();

    expect(screen.getByText(messages.widgetTitle.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText('2 new')).toBeInTheDocument();

    announcementRows.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    expect(screen.getByText('1 Day Ago')).toBeInTheDocument();
    expect(screen.getByText('4 Days Ago')).toBeInTheDocument();
  });

  it('marks an unread announcement as read when clicked', () => {
    useAnnouncements.mockReturnValue({
      data: { results: announcementRows, unread_count: 2 }, isLoading: false, isError: false,
    });
    renderWidget();

    fireEvent.click(screen.getByText('New Course Series: Advanced Machine Learning'));
    expect(markAnnouncementRead).toHaveBeenCalledWith(1);
  });

  it('does not mark an already-read announcement as read when clicked', () => {
    useAnnouncements.mockReturnValue({
      data: { results: announcementRows, unread_count: 2 }, isLoading: false, isError: false,
    });
    renderWidget();

    fireEvent.click(screen.getByText('Q2 Learning Goals Now Available'));
    expect(markAnnouncementRead).not.toHaveBeenCalled();
  });
});
