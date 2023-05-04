import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import useCardActionData from '../hooks';
import BeginCourseButton from './BeginCourseButton';

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(() => ({ homeUrl: 'home-url' })),
    useTrackCourseEvent: jest.fn(
      (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
    ),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableBeginCourse: false })));
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
    test('disabled states', () => {
      useCardActionData.mockReturnValueOnce({ disableBeginCourse: true });
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
