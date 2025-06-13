import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { reduxHooks } from 'hooks';

import CourseCardBanners from '.';

jest.mock('./CourseBanner', () => 'CourseBanner');
jest.mock('./CertificateBanner', () => 'CertificateBanner');
jest.mock('./CreditBanner', () => 'CreditBanner');
jest.mock('./EntitlementBanner', () => 'EntitlementBanner');
jest.mock('./RelatedProgramsBanner', () => 'RelatedProgramsBanner');

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardEnrollmentData: jest.fn(() => ({ isEnrolled: true })),
  },
}));

describe('CourseCardBanners', () => {
  const props = {
    cardId: 'test-card-id',
  };
  it('renders default CourseCardBanners', () => {
    render(<IntlProvider locale="en"><CourseCardBanners {...props} /></IntlProvider>);
    const banners = screen.getByTestId('CourseCardBanners');
    expect(banners.children.length).toBe(5);
  });
  it('render with isEnrolled false', () => {
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false });
    render(<IntlProvider locale="en"><CourseCardBanners {...props} /></IntlProvider>);
    const banners = screen.getByTestId('CourseCardBanners');
    expect(banners.children.length).toBe(3);
  });
});
