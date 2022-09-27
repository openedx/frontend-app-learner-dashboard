import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import CourseCardContent from './CourseCardContent';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
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
  describe('snapshot', () => {
    test('orientation vertical', () => {
      const wrapper = shallow(<CourseCardContent {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('orientation horizontal', () => {
      const wrapper = shallow(<CourseCardContent {...props} orientation="horizontal" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
