import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router-dom';

import { reduxHooks } from '@src/hooks';
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

jest.mock('@src/hooks', () => ({
  reduxHooks: {
    useCardEnrollmentData: jest.fn(() => ({ isEnrolled: true })),
  },
}));

describe('CourseCardBanners', () => {
  const props = {
    cardId: 'test-card-id',
  };
  it('renders default CourseCardBanners', () => {
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: true });
    render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <CourseCardBanners {...props} />
        </IntlProvider>
      </MemoryRouter>
    );
    mockedComponents.map((componentName) => {
      const mockedComponent = screen.getByText(componentName);
      return expect(mockedComponent).toBeInTheDocument();
    });
  });
  it('render with isEnrolled false', () => {
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false });
    render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <CourseCardBanners {...props} />
        </IntlProvider>
      </MemoryRouter>
    );
    const mockedComponentsIfNotEnrolled = mockedComponents.slice(-2);
    mockedComponentsIfNotEnrolled.map((componentName) => {
      const mockedComponent = screen.getByText(componentName);
      return expect(mockedComponent).toBeInTheDocument();
    });
  });
});
