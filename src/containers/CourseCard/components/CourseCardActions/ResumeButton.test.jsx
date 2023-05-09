import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from '../hooks';
import ResumeButton from './ResumeButton';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(() => ({ resumeUrl: 'resumeUrl' })),
    useTrackCourseEvent: (eventName, cardId, url) => jest
      .fn()
      .mockName(`useTrackCourseEvent('${eventName}', '${cardId}', '${url}')`),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableResumeCourse: false })));
jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: 'enterCourseClicked',
  },
}));
jest.mock('./ActionButton', () => 'ActionButton');

const { resumeUrl } = reduxHooks.useCardCourseRunData();

describe('ResumeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  describe('snapshot', () => {
    test('renders default button when learner has access to the course', () => {
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.onClick).getMockName()).toContain(
        'useTrackCourseEvent',
        track.course.enterCourseClicked,
        props.cardId,
        resumeUrl,
      );
    });
  });
  describe('behavior', () => {
    it('initializes course run data based on cardId', () => {
      shallow(<ResumeButton {...props} />);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(
        props.cardId,
      );
    });
    test('disabled states', () => {
      useActionDisabledState.mockReturnValueOnce({ disableResumeCourse: true });
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
