import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from './hooks';
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
    useTrackCourseEvent: jest.fn((eventName, cardId, upgradeUrl) => ({
      trackCourseEvent: { eventName, cardId, upgradeUrl },
    })),
  },
}));
jest.mock('./hooks', () => jest.fn(() => ({ disableCourseTitle: false })));

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
    test('renders disabled link', () => {
      useActionDisabledState.mockReturnValueOnce({ disableCourseTitle: true });
      const wrapper = shallow(<CourseCardTitle {...props} />);
      expect(wrapper).toMatchSnapshot();
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
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
});
