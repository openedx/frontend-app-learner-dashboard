import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from '../hooks';
import ResumeButton from './ResumeButton';

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
jest.mock('../hooks', () => jest.fn(() => ({ disableResumeCourse: false })));
jest.mock('./ActionButton', () => 'ActionButton');

const resumeUrl = 'resume-url';
reduxHooks.useCardCourseRunData.mockReturnValue({ resumeUrl });
const execEdPath = (cardId) => `exec-ed-tracking-path=${cardId}`;
reduxHooks.useCardExecEdTrackingParam.mockImplementation(execEdPath);
reduxHooks.useTrackCourseEvent.mockImplementation(
  (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
);

let wrapper;

describe('ResumeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  describe('behavior', () => {
    it('initializes course run data with cardId', () => {
      wrapper = shallow(<ResumeButton {...props} />);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads exec education path param', () => {
      wrapper = shallow(<ResumeButton {...props} />);
      expect(reduxHooks.useCardExecEdTrackingParam).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for resume action from action hooks', () => {
      wrapper = shallow(<ResumeButton {...props} />);
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('snapshot', () => {
    describe('disabled', () => {
      beforeEach(() => {
        useActionDisabledState.mockReturnValueOnce({ disableResumeCourse: true });
        wrapper = shallow(<ResumeButton {...props} />);
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
        wrapper = shallow(<ResumeButton {...props} />);
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
          resumeUrl + execEdPath(props.cardId),
        ));
      });
    });
  });
});
