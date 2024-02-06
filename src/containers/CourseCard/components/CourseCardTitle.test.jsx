import { shallow } from '@edx/react-unit-test-utils';

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
      expect(wrapper.snapshot).toMatchSnapshot();
      const title = wrapper.instance.findByTestId('CourseCardTitle');
      expect(title[0].type).toBe('a');
      expect(title[0].props.onClick).toEqual(
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
      expect(wrapper.snapshot).toMatchSnapshot();
      const title = wrapper.instance.findByTestId('CourseCardTitle');
      expect(title[0].type).toBe('span');
      expect(title[0].props.onClick).toBeUndefined();
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
