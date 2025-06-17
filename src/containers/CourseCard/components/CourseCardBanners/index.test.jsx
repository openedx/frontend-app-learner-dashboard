import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';

import CourseCardBanners from '.';

jest.mock('./CourseBanner', () => jest.fn(() => <div>CourseBanner</div>));
jest.mock('./CertificateBanner', () => jest.fn(() => <div>CertificateBanner</div>));
jest.mock('./CreditBanner', () => jest.fn(() => <div>CreditBanner</div>));
jest.mock('./EntitlementBanner', () => jest.fn(() => <div>EntitlementBanner</div>));
jest.mock('./RelatedProgramsBanner', () => jest.fn(() => <div>RelatedProgramsBanner</div>));

const mockedComponents = [
  'CourseBanner',
  'CertificateBanner',
  'CreditBanner',
  'EntitlementBanner',
  'RelatedProgramsBanner',
];

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
    mockedComponents.map((componentName) => {
      const mockedComponent = screen.getByText(componentName);
      return expect(mockedComponent).toBeInTheDocument();
    });
  });
  it('render with isEnrolled false', () => {
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false });
    render(<IntlProvider locale="en"><CourseCardBanners {...props} /></IntlProvider>);
    const mockedComponentsIfNotEnrolled = mockedComponents.slice(-2);
    mockedComponentsIfNotEnrolled.map((componentName) => {
      const mockedComponent = screen.getByText(componentName);
      return expect(mockedComponent).toBeInTheDocument();
    });
  });
});
