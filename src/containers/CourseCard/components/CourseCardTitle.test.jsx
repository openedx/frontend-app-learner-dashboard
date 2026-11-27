import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getSiteConfig, setSiteConfig } from '@openedx/frontend-base';
import { courseOutlineRole } from '@src/constants';
import { LocationDisplay, provideRoute } from '@src/testUtils';
import { useCourseData, useCourseTrackingEvent } from '@src/hooks';
import track from '@src/tracking';
import useActionDisabledState from './hooks';
import CourseCardTitle from './CourseCardTitle';

jest.mock('@src/tracking', () => ({
  course: {
    courseTitleClicked: jest.fn().mockName('segment.courseTitleClicked'),
  },
}));

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
  useCourseTrackingEvent: jest.fn(),
}));

jest.mock('./hooks', () => jest.fn(() => ({ disableCourseTitle: false })));

describe('CourseCardTitle', () => {
  const props = {
    cardId: 'test-card-id',
  };

  const courseName = 'Test Course';
  const homeUrl = 'http://test.com';
  const handleTitleClick = jest.fn();
  const siteConfig = getSiteConfig();

  afterEach(() => {
    setSiteConfig(siteConfig);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    useCourseData.mockReturnValue({
      course: { courseName },
      courseRun: { homeUrl },
    });
    useCourseTrackingEvent.mockReturnValue(handleTitleClick);
  });

  it('renders course name as link when not disabled', async () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    render(<CourseCardTitle {...props} />);

    const user = userEvent.setup();
    const link = screen.getByRole('link', { name: courseName });
    expect(link).toHaveAttribute('href', homeUrl);

    await user.click(link);
    expect(handleTitleClick).toHaveBeenCalled();
  });

  it('links to the course home in this site when an app provides it', async () => {
    const courseId = 'course-v1:Test+101+2024';
    provideRoute(courseOutlineRole, 'learning/course/:courseId/home');
    useCourseData.mockReturnValue({
      course: { courseName },
      courseRun: { courseId, homeUrl: `${global.location.origin}/learning/course/${courseId}/home` },
    });
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    render(<MemoryRouter><CourseCardTitle {...props} /><LocationDisplay /></MemoryRouter>);

    await userEvent.click(screen.getByRole('link', { name: courseName }));
    expect(decodeURIComponent(screen.getByTestId('location').textContent)).toEqual(`/learning/course/${courseId}/home`);
    expect(decodeURIComponent(useCourseTrackingEvent.mock.calls[0][2])).toEqual(`/learning/course/${courseId}/home`);
  });

  it('renders course name as span when disabled', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: true });
    render(<CourseCardTitle {...props} />);

    const text = screen.getByText(courseName);
    expect(text).toBeInTheDocument();
    expect(text.tagName.toLowerCase()).toBe('span');
  });

  it('uses correct hooks with cardId', () => {
    useActionDisabledState.mockReturnValue({ disableCourseTitle: false });
    render(<CourseCardTitle {...props} />);

    expect(useCourseData).toHaveBeenCalledWith(props.cardId);
    expect(useCourseTrackingEvent).toHaveBeenCalledWith(
      track.course.courseTitleClicked,
      props.cardId,
      homeUrl,
    );
  });
});
