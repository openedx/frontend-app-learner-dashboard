import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import QuickNavigationWidget from '.';
import messages from './messages';

jest.mock('@edx/frontend-platform', () => ({
  ...jest.requireActual('@edx/frontend-platform'),
  getConfig: jest.fn(),
}));

// eslint-disable-next-line global-require
const { getConfig } = require('@edx/frontend-platform');

const renderWidget = () => render(
  <IntlProvider locale="en"><QuickNavigationWidget /></IntlProvider>,
);

describe('QuickNavigationWidget', () => {
  it('renders all links with the expected destinations', () => {
    getConfig.mockReturnValue({
      LMS_BASE_URL: 'https://lms.example.com',
      SEARCH_CATALOG_URL: '/course',
      SUPPORT_URL: 'https://support.example.com',
    });
    renderWidget();

    expect(screen.getByText(messages.widgetTitle.defaultMessage)).toBeInTheDocument();

    const expectedLinks = [
      [messages.discoverCourses.defaultMessage, 'https://lms.example.com/course'],
      [messages.viewLearningHistory.defaultMessage, 'https://lms.example.com/history'],
      [messages.browseByProvider.defaultMessage, 'https://lms.example.com/course?f=provider'],
      [messages.browseByTopic.defaultMessage, 'https://lms.example.com/course?f=topic'],
      [messages.getHelp.defaultMessage, 'https://support.example.com'],
    ];

    expectedLinks.forEach(([label, href]) => {
      expect(screen.getByText(label).closest('a')).toHaveAttribute('href', href);
    });
  });

  it('omits a link when its destination config is missing', () => {
    getConfig.mockReturnValue({
      LMS_BASE_URL: 'https://lms.example.com',
      SEARCH_CATALOG_URL: '/course',
      SUPPORT_URL: null,
    });
    renderWidget();

    expect(screen.queryByText(messages.getHelp.defaultMessage)).not.toBeInTheDocument();
    expect(screen.getByText(messages.discoverCourses.defaultMessage)).toBeInTheDocument();
  });
});
