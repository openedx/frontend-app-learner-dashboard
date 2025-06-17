import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';
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

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const homeUrl = 'home-url';
reduxHooks.useCardCourseRunData.mockReturnValue({ homeUrl });
const execEdPath = (cardId) => `exec-ed-tracking-path=${cardId}`;
reduxHooks.useCardExecEdTrackingParam.mockImplementation(execEdPath);
reduxHooks.useTrackCourseEvent.mockImplementation(
  (eventName, cardId, url) => ({ trackCourseEvent: { eventName, cardId, url } }),
);

const props = {
  cardId: 'cardId',
};

const renderComponent = () => render(<IntlProvider locale="en"><BeginCourseButton {...props} /></IntlProvider>);

describe('BeginCourseButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initiliaze hooks', () => {
    it('initializes course run data with cardId', () => {
      renderComponent();
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads exec education path param', () => {
      renderComponent();
      expect(reduxHooks.useCardExecEdTrackingParam).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for begin action from action hooks', () => {
      renderComponent();
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('behavior', () => {
    describe('disabled', () => {
      it('should be disabled', () => {
        useActionDisabledState.mockReturnValueOnce({ disableBeginCourse: true });
        renderComponent();
        const button = screen.getByRole('button', { name: 'Begin Course' });
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('enabled', () => {
      it('should be enabled', () => {
        renderComponent();
        const button = screen.getByRole('button', { name: 'Begin Course' });
        expect(button).not.toHaveClass('disabled');
        expect(button).not.toHaveAttribute('aria-disabled', 'true');
      });
      it('should track enter course clicked event on click, with exec ed param', async () => {
        renderComponent();
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
