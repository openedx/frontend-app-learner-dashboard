import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import CourseCardContent from './CourseCardContent';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

jest.mock('./CourseCardActions', () => 'CourseCardActions');
jest.mock('./CourseCardDetails', () => 'CourseCardDetails');
jest.mock('./RelatedProgramsBadge', () => 'RelatedProgramsBadge');
jest.mock('./CourseCardMenu', () => 'CourseCardMenu');

describe('CourseCardContent', () => {
  const props = {
    cardId: 'test-card-id',
    orientation: 'vertical',
  };
  hooks.useCardCourseData.mockReturnValue({
    courseName: 'test-course-name',
    bannerImgSrc: 'test-banner-img-src',
  });
  hooks.useCardCourseRunData.mockReturnValue({
    homeUrl: 'test-home-url',
  });
  describe('snapshot', () => {
    test('orientation vertical', () => {
      hooks.useCardEnrollmentData.mockReturnValue({
        isVerified: true,
      });
      const wrapper = shallow(<CourseCardContent {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('orientation horizontal', () => {
      hooks.useCardEnrollmentData.mockReturnValue({
        isVerified: true,
      });
      const wrapper = shallow(<CourseCardContent {...props} orientation="horizontal" />);
      expect(wrapper).toMatchSnapshot();
    });
    test('not verified', () => {
      hooks.useCardEnrollmentData.mockReturnValue({
        isVerified: false,
      });
      const wrapper = shallow(<CourseCardContent {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
