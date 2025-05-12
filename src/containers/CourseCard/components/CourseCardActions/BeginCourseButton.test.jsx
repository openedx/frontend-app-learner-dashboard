import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from '../hooks';
import BeginCourseButton from './BeginCourseButton';

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(),
    useCardExecEdTrackingParam: jest.fn(),
    useTrackCourseEvent: jest.fn(),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableBeginCourse: false })));
jest.mock('./ActionButton', () => 'ActionButton');

let wrapper;
const homeUrl = 'home-url';
reduxHooks.useCardCourseRunData.mockReturnValue({ homeUrl });
const execEdPath = (cardId) => `exec-ed-tracking-path=${cardId}`;
reduxHooks.useCardExecEdTrackingParam.mockImplementation(execEdPath);
reduxHooks.useTrackCourseEvent.mockImplementation(
  (eventName, cardId, url) => ({ trackCourseEvent: { eventName, cardId, url } }),
);

describe('BeginCourseButton', () => {
  const props = {
    cardId: 'cardId',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    it('initializes course run data with cardId', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads exec education path param', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(reduxHooks.useCardExecEdTrackingParam).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for begin action from action hooks', () => {
      wrapper = shallow(<BeginCourseButton {...props} />);
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('snapshot', () => {
    describe('disabled', () => {
      beforeEach(() => {
        useActionDisabledState.mockReturnValueOnce({ disableBeginCourse: true });
        wrapper = shallow(<BeginCourseButton {...props} />);
      });
      test('snapshot', () => {
        expect(wrapper.snapshot).toMatchSnapshot();
      });
      it('should be disabled', () => {
        expect(wrapper.instance.props.disabled).toEqual(true);
      });
    });
    describe('enabled', () => {
      beforeEach(() => {
        wrapper = shallow(<BeginCourseButton {...props} />);
      });
      test('snapshot', () => {
        expect(wrapper.snapshot).toMatchSnapshot();
      });
      it('should be enabled', () => {
        expect(wrapper.instance.props.disabled).toEqual(false);
      });
      it('should track enter course clicked event on click, with exec ed param', () => {
        expect(wrapper.instance.props.onClick).toEqual(reduxHooks.useTrackCourseEvent(
          track.course.enterCourseClicked,
          props.cardId,
          homeUrl + execEdPath(props.cardId),
        ));
      });
    });
  });
});
