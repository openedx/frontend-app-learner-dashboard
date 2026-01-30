import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import useActionDisabledState from '../hooks';
import BeginCourseButton from './BeginCourseButton';

jest.mock('hooks', () => ({
  useCourseData: jest.fn().mockReturnValue({
    enrollment: { mode: 'executive-education' },
    courseRun: { homeUrl: 'home-url' },
  }),
  useCourseTrackingEvent: jest.fn().mockReturnValue({
    trackCourseEvent: jest.fn(),
  }),
}));

jest.mock('data/react-query/apiHooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({
    data: {
      enterpriseDashboard: {
        authOrgId: 'test-org-id',
      },
    },
  }),
}));

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('../hooks', () => jest.fn(() => ({ disableBeginCourse: false })));

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const homeUrl = 'home-url';

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
      expect(useCourseData).toHaveBeenCalledWith(props.cardId);
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
      it('should track enter course clicked event on click, with exec ed param', () => {
        renderComponent();
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: 'Begin Course' });
        user.click(button);
        expect(useCourseTrackingEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          `${homeUrl}?org_id=test-org-id`,
        );
      });
    });
  });
});
