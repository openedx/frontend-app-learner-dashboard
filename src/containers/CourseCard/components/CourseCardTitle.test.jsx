import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from './hooks';
import CourseCardTitle from './CourseCardTitle';

jest.mock('tracking', () => ({
  course: {
    courseTitleClicked: jest.fn().mockName('segment.courseTitleClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useTrackCourseEvent: jest.fn(),
  },
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
    reduxHooks.useCardCourseData.mockReturnValue({ courseName });
    reduxHooks.useCardCourseRunData.mockReturnValue({ homeUrl });
    reduxHooks.useTrackCourseEvent.mockReturnValue(handleTitleClick);
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

    expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(props.cardId);
    expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
      track.course.courseTitleClicked,
      props.cardId,
      homeUrl,
    );
  });
});
