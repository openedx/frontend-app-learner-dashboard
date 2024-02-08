import { shallow } from '@edx/react-unit-test-utils';

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
  test('renders default CourseCardBanners', () => {
    const wrapper = shallow(<CourseCardBanners {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
  test('render with isEnrolled false', () => {
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false });
    const wrapper = shallow(<CourseCardBanners {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
