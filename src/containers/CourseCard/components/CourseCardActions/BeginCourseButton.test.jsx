import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import BeginCourseButton from './BeginCourseButton';

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
    it('renders default button when learner has access to the course', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: true,
      });
      const wrapper = shallow(<BeginCourseButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button when learner does not have access to the course', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: false,
      });
      const wrapper = shallow(<BeginCourseButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
