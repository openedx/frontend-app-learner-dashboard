import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';
import { reduxHooks } from 'hooks';
import useActionDisabledState from './hooks';
import { CourseCardImage } from './CourseCardImage';
import messages from '../messages';

const homeUrl = 'https://example.com';
const bannerImgSrc = 'banner-img-src.jpg';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(() => ({ bannerImgSrc })),
    useCardCourseRunData: jest.fn(() => ({ homeUrl })),
    useCardEnrollmentData: jest.fn(),
    useTrackCourseEvent: jest.fn((eventName, cardId, url) => ({
      trackCourseEvent: { eventName, cardId, url },
    })),
  },
}));

jest.mock('./hooks', () => jest.fn());

describe('CourseCardImage', () => {
  const props = {
    cardId: 'test-card-id',
    orientation: 'horizontal',
  };

  it('renders course image with correct attributes', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: true });
    reduxHooks.useCardEnrollmentData.mockReturnValue({ isVerified: true });
    render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);

    const image = screen.getByRole('img', { name: formatMessage(messages.bannerAlt) });
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(bannerImgSrc);
    expect(image.parentElement).toHaveClass('horizontal');
  });

  it('isVerified, should render badge', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    reduxHooks.useCardEnrollmentData.mockReturnValue({ isVerified: true });
    render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);

    const badge = screen.getByText(formatMessage(messages.verifiedBanner));
    expect(badge).toBeInTheDocument();
    const badgeImg = screen.getByRole('img', { name: formatMessage(messages.verifiedBannerRibbonAlt) });
    expect(badgeImg).toBeInTheDocument();
  });

  it('renders link with correct href if disableCourseTitle is false', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    reduxHooks.useCardEnrollmentData.mockReturnValue({ isVerified: false });
    render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', homeUrl);
  });
  describe('hooks', () => {
    it('initializes', () => {
      useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
      reduxHooks.useCardEnrollmentData.mockReturnValue({ isVerified: true });
      render(<IntlProvider locale="en"><CourseCardImage {...props} /></IntlProvider>);
      expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(props.cardId);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(
        props.cardId,
      );
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
});
