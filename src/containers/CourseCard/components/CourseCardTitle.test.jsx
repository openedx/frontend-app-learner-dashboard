import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import track from 'tracking';
import useActionDisabledState from './hooks';
import CourseCardTitle from './CourseCardTitle';

jest.mock('tracking', () => ({
  course: {
    courseTitleClicked: jest.fn().mockName('segment.courseTitleClicked'),
  },
}));

jest.mock('hooks', () => ({
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
