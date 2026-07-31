import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';
import { useCourseData } from 'hooks';
import useActionDisabledState from './hooks';
import useCourseCardMeta from './CourseCardMeta/hooks';
import { CourseCardImage } from './CourseCardImage';
import messages from '../messages';

const homeUrl = 'https://example.com';
const bannerImgSrc = 'banner-img-src.jpg';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(() => ({
    course: { bannerImgSrc },
    courseRun: { homeUrl },
    enrollment: {},
  })),
  useCourseTrackingEvent: jest.fn((eventName, cardId, url) => ({
    trackCourseEvent: { eventName, cardId, url },
  })),
  utilHooks: {
    useFormatDate: jest.fn(() => (date) => String(date)),
  },
}));

jest.mock('./hooks', () => jest.fn());
jest.mock('./CourseCardMeta/hooks', () => jest.fn(() => ({ isOverdue: false, isDueSoon: false })));

describe('CourseCardImage', () => {
  const props = {
    cardId: 'test-card-id',
    orientation: 'horizontal',
  };

  it('renders course image with correct attributes', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: true });
    useCourseData.mockReturnValue(
      {
        course: { bannerImgSrc },
        courseRun: { homeUrl },
        enrollment: { isVerified: true },
      },
    );
    render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);

    const image = screen.getByRole('img', { name: formatMessage(messages.bannerAlt) });
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(bannerImgSrc);
    expect(image.parentElement).toHaveClass('horizontal');
  });

  it('isVerified, should render badge', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    useCourseData.mockReturnValue(
      {
        course: { bannerImgSrc },
        courseRun: { homeUrl },
        enrollment: { isVerified: true },
      },
    );
    render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);

    const badge = screen.getByText(formatMessage(messages.verifiedBanner));
    expect(badge).toBeInTheDocument();
    const badgeImg = screen.getByRole('img', { name: formatMessage(messages.verifiedBannerRibbonAlt) });
    expect(badgeImg).toBeInTheDocument();
  });

  it('renders link with correct href if disableCourseTitle is false', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    useCourseData.mockReturnValue(
      {
        course: { bannerImgSrc },
        courseRun: { homeUrl },
        enrollment: { isVerified: false },
      },
    );
    render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', homeUrl);
  });
  describe('hooks', () => {
    it('initializes', () => {
      useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
      useCourseData.mockReturnValue(
        {
          course: { bannerImgSrc },
          courseRun: { homeUrl },
          enrollment: { isVerified: true },
        },
      );
      render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);
      expect(useCourseData).toHaveBeenCalledWith(props.cardId);
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
      expect(useCourseCardMeta).toHaveBeenCalledWith(props.cardId);
    });
  });

  describe('overdue/due-soon badge', () => {
    beforeEach(() => {
      useActionDisabledState.mockReturnValue({ disableCourseTitle: true });
      useCourseData.mockReturnValue({
        course: { bannerImgSrc },
        courseRun: { homeUrl },
        enrollment: {},
      });
    });

    it('renders an Overdue badge when useCourseCardMeta reports isOverdue', () => {
      useCourseCardMeta.mockReturnValue({ isOverdue: true, isDueSoon: false });
      render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);
      expect(screen.getByTestId('CourseCardStatusBadge')).toHaveTextContent('Overdue');
    });

    it('renders a Due Soon badge when useCourseCardMeta reports isDueSoon', () => {
      useCourseCardMeta.mockReturnValue({ isOverdue: false, isDueSoon: true });
      render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);
      expect(screen.getByTestId('CourseCardStatusBadge')).toHaveTextContent('Due Soon');
    });

    it('renders no badge when neither overdue nor due soon', () => {
      useCourseCardMeta.mockReturnValue({ isOverdue: false, isDueSoon: false });
      render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);
      expect(screen.queryByTestId('CourseCardStatusBadge')).not.toBeInTheDocument();
    });
  });
});
