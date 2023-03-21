import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import BeginCourseButton from './BeginCourseButton';

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(() => ({ homeUrl: 'home-url' })),
    useCardEnrollmentData: jest.fn(() => ({ hasAccess: true, isAudit: false, isAuditAccessExpired: false })),
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
    useTrackCourseEvent: jest.fn(
      (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
    ),
  },
}));

jest.mock('./ActionButton', () => 'ActionButton');

let wrapper;
const { homeUrl } = reduxHooks.useCardCourseRunData();

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
      expect(wrapper.prop(htmlProps.onClick)).toEqual(reduxHooks.useTrackCourseEvent(
        track.course.enterCourseClicked,
        props.cardId,
        homeUrl,
      ));
    });
  });
  describe('behavior', () => {
    it('initializes course run data with cardId', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('initializes enrollment data with cardId', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(reduxHooks.useCardEnrollmentData).toHaveBeenCalledWith(props.cardId);
    });
    describe('disabled states', () => {
      test('learner does not have access', () => {
        reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
        wrapper = shallow(<BeginCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('masquerading', () => {
        reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
        wrapper = shallow(<BeginCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('audit access expired', () => {
        reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isAudit: true, isAuditAccessExpired: true });
        wrapper = shallow(<BeginCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
    });
  });
});
