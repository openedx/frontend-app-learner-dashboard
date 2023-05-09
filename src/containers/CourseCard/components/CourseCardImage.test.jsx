import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from './hooks';
import CourseCardImage from './CourseCardImage';

const homeUrl = 'home-url';

jest.mock('tracking', () => ({
  course: {
    courseImageClicked: jest.fn().mockName('segment.courseImageClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(() => ({ bannerImgSrc: 'banner-img-src' })),
    useCardCourseRunData: jest.fn(() => ({ homeUrl })),
    useCardEnrollmentData: jest.fn(() => ({ isVerified: true })),
    useTrackCourseEvent: jest.fn((eventName, cardId, upgradeUrl) => ({
      trackCourseEvent: { eventName, cardId, upgradeUrl },
    })),
  },
}));
jest.mock('./hooks', () => jest.fn(() => ({ disableCourseTitle: false })));

describe('CourseCardImage', () => {
  const props = {
    cardId: 'cardId',
    orientation: 'orientation',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('snapshot', () => {
    test('renders clickable link course Image', () => {
      const wrapper = shallow(<CourseCardImage {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.type()).toBe('a');
      expect(wrapper.prop('onClick')).toEqual(
        reduxHooks.useTrackCourseEvent(
          track.course.courseImageClicked,
          props.cardId,
          homeUrl,
        ),
      );
    });
    test('renders disabled link', () => {
      useActionDisabledState.mockReturnValueOnce({ disableCourseTitle: true });
      const wrapper = shallow(<CourseCardImage {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.type()).toBe('div');
    });
  });
  describe('behavior', () => {
    it('initializes', () => {
      shallow(<CourseCardImage {...props} />);
      expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(props.cardId);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(
        props.cardId,
      );
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
});
