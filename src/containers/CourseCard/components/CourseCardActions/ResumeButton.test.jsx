import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
jest.unmock('@openedx/paragon');
jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const resumeUrl = 'resume-url';
reduxHooks.useCardCourseRunData.mockReturnValue({ resumeUrl });
const execEdPath = (cardId) => `exec-ed-tracking-path=${cardId}`;
reduxHooks.useCardExecEdTrackingParam.mockImplementation(execEdPath);
reduxHooks.useTrackCourseEvent.mockImplementation(
  (eventName, cardId, url) => ({ trackCourseEvent: { eventName, cardId, url } }),
);

describe('ResumeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  describe('initialize hooks', () => {
    it('initializes course run data with cardId', () => {
      render(<ResumeButton {...props} />);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads exec education path param', () => {
      render(<ResumeButton {...props} />);
      expect(reduxHooks.useCardExecEdTrackingParam).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for resume action from action hooks', () => {
      render(<ResumeButton {...props} />);
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('behavior', () => {
    describe('disabled', () => {
      beforeEach(() => {
        useActionDisabledState.mockReturnValueOnce({ disableResumeCourse: true });
      });
      it('should be disabled', () => {
        const { getByRole } = render(<ResumeButton {...props} />);
        const button = getByRole('button', { name: 'Resume' });
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('enabled', () => {
      it('should be enabled', () => {
        const { getByRole } = render(<ResumeButton {...props} />);
        const button = getByRole('button', { name: 'Resume' });
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass('disabled');
        expect(button).not.toHaveAttribute('aria-disabled', 'true');
      });
      it('should track enter course clicked event on click, with exec ed param', async () => {
        const { getByRole } = render(<ResumeButton {...props} />);
        const button = getByRole('button', { name: 'Resume' });
        await act(async () => {
          userEvent.click(button);
        });
        expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          resumeUrl + execEdPath(props.cardId),
        );
      });
    });
  });
});
