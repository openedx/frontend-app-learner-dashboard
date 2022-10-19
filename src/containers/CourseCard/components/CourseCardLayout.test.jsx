import { shallow } from 'enzyme';

import { isDesktopSize } from 'data/responsive';
import CourseCardLayout from './CourseCardLayout';

jest.mock('./CourseCardBanners', () => 'CourseCardBanners');
jest.mock('./CourseCardContent', () => 'CourseCardContent');

describe('CourseCardLayout', () => {
  const props = {
    cardId: 'test-card-id',
  };
  describe('snapshot', () => {
    test('is collapsed', () => {
      isDesktopSize.mockReturnValue(false);
      const wrapper = shallow(<CourseCardLayout {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('is not collapsed', () => {
      isDesktopSize.mockReturnValue(true);
      const wrapper = shallow(<CourseCardLayout {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
