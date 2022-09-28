import { shallow } from 'enzyme';

import { htmlProps } from 'testKeys';
import { hooks } from 'data/redux';
import BeginCourseButton from './BeginCourseButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(() => ({ homeUrl: 'home-url' })),
    useCardEnrollmentData: jest.fn(() => ({ hasAccess: true })),
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
  },
}));

let wrapper;
const { homeUrl } = hooks.useCardCourseRunData();

describe('BeginCourseButton', () => {
  const props = {
    cardId: 'cardId',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('snapshot', () => {
    test('renders default button when learner has access to the course', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.href)).toEqual(homeUrl);
    });
  });
  describe('behavior', () => {
    it('initializes course run data with cardId', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(hooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('initializes enrollment data with cardId', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(hooks.useCardEnrollmentData).toHaveBeenCalledWith(props.cardId);
    });
    describe('disabled states', () => {
      test('learner does not have access', () => {
        hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
        wrapper = shallow(<BeginCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('masquerading', () => {
        hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
        wrapper = shallow(<BeginCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
    });
  });
});
