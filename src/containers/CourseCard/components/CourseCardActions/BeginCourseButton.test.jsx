import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from '../hooks';
import BeginCourseButton from './BeginCourseButton';

jest.unmock('@openedx/paragon');

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

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

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
  describe('initiliaze hooks', () => {
    it('initializes course run data with cardId', () => {
      render(<BeginCourseButton {...props} />);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads exec education path param', () => {
      render(<BeginCourseButton {...props} />);
      expect(reduxHooks.useCardExecEdTrackingParam).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for begin action from action hooks', () => {
      render(<BeginCourseButton {...props} />);
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('behavior', () => {
    describe('disabled', () => {
      it('should be disabled', () => {
        useActionDisabledState.mockReturnValueOnce({ disableBeginCourse: true });
        render(<BeginCourseButton {...props} />);
        const button = screen.getByRole('button', { name: 'Begin Course' });
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('enabled', () => {
      it('should be enabled', () => {
        render(<BeginCourseButton {...props} />);
        const button = screen.getByRole('button', { name: 'Begin Course' });
        expect(button).not.toHaveClass('disabled');
        expect(button).not.toHaveAttribute('aria-disabled', 'true');
      });
      it('should track enter course clicked event on click, with exec ed param', async () => {
        render(<BeginCourseButton {...props} />);
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: 'Begin Course' });
        user.click(button);
        expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          homeUrl + execEdPath(props.cardId),
        );
      });
    });
  });
});
