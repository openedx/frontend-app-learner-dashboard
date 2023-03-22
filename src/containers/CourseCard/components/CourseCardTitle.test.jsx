import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import track from 'tracking';
import CourseCardTitle from './CourseCardTitle';

const homeUrl = 'home-url';

jest.mock('tracking', () => ({
  course: {
    courseTitleClicked: jest.fn().mockName('segment.courseTitleClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(() => ({ courseName: 'course-name' })),
    useCardCourseRunData: jest.fn(() => ({ homeUrl })),
    useCardEntitlementData: jest.fn(() => ({
      isEntitlement: false,
      isFulfilled: false,
    })),
    useTrackCourseEvent: jest.fn((eventName, cardId, upgradeUrl) => ({
      trackCourseEvent: { eventName, cardId, upgradeUrl },
    })),
  },
}));

describe('CourseCardTitle', () => {
  const props = {
    cardId: 'cardId',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('snapshot', () => {
    test('renders clickable link course title', () => {
      const wrapper = shallow(<CourseCardTitle {...props} />);
      expect(wrapper).toMatchSnapshot();
      const title = wrapper.find('.course-card-title');
      expect(title.type()).toBe('a');
      expect(title.prop('onClick')).toEqual(
        reduxHooks.useTrackCourseEvent(
          track.course.courseTitleClicked,
          props.cardId,
          homeUrl,
        ),
      );
    });
    test('renders disabled link course title when learner does not have access to the course', () => {
      reduxHooks.useCardEntitlementData.mockReturnValueOnce({
        isEntitlement: true,
        isFulfilled: false,
      });
      const wrapper = shallow(<CourseCardTitle {...props} />);
      expect(wrapper).toMatchSnapshot();
      const title = wrapper.find('.course-card-title');
      expect(title.type()).toBe('span');
      expect(title.prop('onClick')).toBeUndefined();
    });
    test('renders disabled link course title when homeUrl is not available', () => {
      reduxHooks.useCardCourseRunData.mockReturnValueOnce({ homeUrl: null });
      const wrapper = shallow(<CourseCardTitle {...props} />);
      const title = wrapper.find('.course-card-title');
      expect(title.type()).toBe('span');
      expect(title.prop('onClick')).toBeUndefined();
    });
  });
  describe('behavior', () => {
    it('initializes', () => {
      shallow(<CourseCardTitle {...props} />);
      expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(props.cardId);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(
        props.cardId,
      );
      expect(reduxHooks.useCardEntitlementData).toHaveBeenCalledWith(
        props.cardId,
      );
    });
  });
});
