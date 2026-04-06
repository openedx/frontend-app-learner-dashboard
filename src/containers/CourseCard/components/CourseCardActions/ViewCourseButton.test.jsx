import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@openedx/frontend-base';
import { useCourseTrackingEvent } from '@src/hooks';

import track from '@src/tracking';
import useActionDisabledState from '../hooks';
import ViewCourseButton from './ViewCourseButton';

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn().mockReturnValue({
    courseRun: { homeUrl: 'homeUrl' },
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

jest.mock('../hooks', () => jest.fn(() => ({ disableViewCourse: false })));

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const defaultProps = { cardId: 'cardId' };
const homeUrl = 'homeUrl';

describe('ViewCourseButton', () => {
  it('learner can view course', async () => {
    render(<IntlProvider locale="en"><ViewCourseButton {...defaultProps} /></IntlProvider>);
    const button = screen.getByRole('link', { name: 'View Course' });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('disabled');
    expect(button).not.toHaveAttribute('aria-disabled', 'true');
  });
  it('calls trackCourseEvent on click', async () => {
    const mockedTrackCourseEvent = jest.fn();
    useCourseTrackingEvent.mockReturnValue(mockedTrackCourseEvent);
    render(<IntlProvider locale="en"><ViewCourseButton {...defaultProps} /></IntlProvider>);
    const user = userEvent.setup();
    const button = screen.getByRole('link', { name: 'View Course' });
    await user.click(button);
    expect(useCourseTrackingEvent).toHaveBeenCalledWith(
      track.course.enterCourseClicked,
      defaultProps.cardId,
      homeUrl,
    );
    expect(mockedTrackCourseEvent).toHaveBeenCalled();
  });
  it('learner cannot view course', () => {
    useActionDisabledState.mockReturnValueOnce({ disableViewCourse: true });
    render(<IntlProvider locale="en"><ViewCourseButton {...defaultProps} /></IntlProvider>);
    const button = screen.getByRole('link', { name: 'View Course' });
    expect(button).toHaveClass('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});
