import { shallow } from 'enzyme';

import BeginCourseButton from './BeginCourseButton';
import { hooks } from 'data/redux';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

describe('BeginCourseButton', () => {
  const props = {
    cardId: 'cardId',
  };
  hooks.useCardCourseRunData.mockReturnValue({
    homeUrl: 'homeUrl',
  });
  describe('snapshot', () => {
    it('renders default button', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: true,
      });
      const wrapper = shallow(<BeginCourseButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: false,
      });
      const wrapper = shallow(<BeginCourseButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});