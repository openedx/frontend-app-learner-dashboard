import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

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
    beforeEach(() => render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>));
    it('initializes course run data with cardId', () => {
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads exec education path param', () => {
      expect(reduxHooks.useCardExecEdTrackingParam).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for resume action from action hooks', () => {
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('behavior', () => {
    describe('disabled', () => {
      beforeEach(() => {
        useActionDisabledState.mockReturnValueOnce({ disableResumeCourse: true });
      });
      it('should be disabled', () => {
        render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>);
        const button = screen.getByRole('button', { name: 'Resume' });
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('enabled', () => {
      it('should be enabled', () => {
        render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>);
        const button = screen.getByRole('button', { name: 'Resume' });
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass('disabled');
        expect(button).not.toHaveAttribute('aria-disabled', 'true');
      });
      it('should track enter course clicked event on click, with exec ed param', async () => {
        render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>);
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: 'Resume' });
        user.click(button);
        expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          resumeUrl + execEdPath(props.cardId),
        );
      });
    });
  });
});
