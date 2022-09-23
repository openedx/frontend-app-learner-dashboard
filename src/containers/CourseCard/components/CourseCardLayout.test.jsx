import { shallow } from 'enzyme';

import CourseCardLayout from './CourseCardLayout';
import { useIsCollapsed } from '../hooks';

jest.mock('../hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('./CourseCardBanners', () => 'CourseCardBanners');
jest.mock('./CourseCardContent', () => 'CourseCardContent');

describe('CourseCardLayout', () => {
  const props = {
    cardId: 'test-card-id',
  };
  describe('snapshot', () => {
    it('is collapsed', () => {
      useIsCollapsed.mockReturnValue(true);
      const wrapper = shallow(<CourseCardLayout {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('is not collapsed', () => {
      useIsCollapsed.mockReturnValue(false);
      const wrapper = shallow(<CourseCardLayout {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
