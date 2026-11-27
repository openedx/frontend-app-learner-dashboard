import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider, getSiteConfig, setSiteConfig } from '@openedx/frontend-base';
import { coursewareRole } from '@src/constants';
import { LocationDisplay, provideRoute } from '@src/testUtils';
import { useCourseTrackingEvent, useCourseData } from '@src/hooks';

import track from '@src/tracking';
import useActionDisabledState from '../hooks';
import ResumeButton from './ResumeButton';

const authOrgId = 'auth-org-id';
jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({
    data: {
      enterpriseDashboard: {
        authOrgId,
      },
    },
  }),
}));

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn().mockReturnValue({
    enrollment: { mode: 'executive-education' },
    courseRun: { homeUrl: 'http://localhost:8000/courses/course-v1:Test+101+2024/course/' },
  }),
  useCourseTrackingEvent: jest.fn().mockReturnValue({
    trackCourseEvent: jest.fn(),
  }),
}));

jest.mock('@src/tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('../hooks', () => jest.fn(() => ({ disableResumeCourse: false })));

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const lmsCourseData = {
  enrollment: { mode: 'executive-education' },
  courseRun: { resumeUrl: '/courses/course-v1:Test+101+2024/courseware/chapter1/' },
};
useCourseData.mockReturnValue(lmsCourseData);

describe('ResumeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  describe('initialize hooks', () => {
    beforeEach(() => render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>));
    it('initializes course run data with cardId', () => {
      expect(useCourseData).toHaveBeenCalledWith(props.cardId);
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
        const button = screen.getByRole('link', { name: 'Resume' });
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('enabled', () => {
      it('should be enabled', () => {
        render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>);
        const button = screen.getByRole('link', { name: 'Resume' });
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass('disabled');
        expect(button).not.toHaveAttribute('aria-disabled', 'true');
      });
      describe('when an app in this site provides the courseware', () => {
        const siteConfig = getSiteConfig();
        const courseId = 'course-v1:Test+101+2024';

        afterEach(() => {
          setSiteConfig(siteConfig);
          useCourseData.mockReturnValue(lmsCourseData);
          useCourseTrackingEvent.mockReturnValue({ trackCourseEvent: jest.fn() });
        });

        it('resumes there, in the client', async () => {
          provideRoute(coursewareRole, 'learning/course/:courseId');
          useCourseData.mockReturnValue({
            enrollment: { mode: 'verified' },
            courseRun: { courseId, resumeUrl: `/courses/${courseId}/jump_to/block-v1:Test+101+2024+type@problem+block@abc` },
          });
          useCourseTrackingEvent.mockReturnValue(jest.fn());
          render(
            <IntlProvider locale="en">
              <MemoryRouter><ResumeButton {...props} /><LocationDisplay /></MemoryRouter>
            </IntlProvider>,
          );

          await userEvent.click(screen.getByRole('link', { name: 'Resume' }));
          expect(decodeURIComponent(screen.getByTestId('location').textContent)).toEqual(`/learning/course/${courseId}`);
        });
      });
      it('should track enter course clicked event on click, with exec ed param', async () => {
        render(<IntlProvider locale="en"><ResumeButton {...props} /></IntlProvider>);
        const user = userEvent.setup();
        const button = screen.getByRole('link', { name: 'Resume' });
        user.click(button);
        expect(useCourseTrackingEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          `http://localhost:8000/courses/course-v1:Test+101+2024/courseware/chapter1/?org_id=${authOrgId}`,
        );
      });
    });
  });
});
