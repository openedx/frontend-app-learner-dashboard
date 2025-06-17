import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';
import ViewCourseButton from './ViewCourseButton';

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(() => ({ homeUrl: 'homeUrl' })),
    useTrackCourseEvent: jest.fn(),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableViewCourse: false })));

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const defaultProps = { cardId: 'cardId' };
const homeUrl = 'homeUrl';

describe('ViewCourseButton', () => {
  it('learner can view course', async () => {
    render(<IntlProvider locale="en"><ViewCourseButton {...defaultProps} /></IntlProvider>);
    const button = screen.getByRole('button', { name: 'View Course' });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('disabled');
    expect(button).not.toHaveAttribute('aria-disabled', 'true');
  });
  it('calls trackCourseEvent on click', async () => {
    render(<IntlProvider locale="en"><ViewCourseButton {...defaultProps} /></IntlProvider>);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'View Course' });
    await user.click(button);
    expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
      track.course.enterCourseClicked,
      defaultProps.cardId,
      homeUrl,
    );
  });
  it('learner cannot view course', () => {
    useActionDisabledState.mockReturnValueOnce({ disableViewCourse: true });
    render(<IntlProvider locale="en"><ViewCourseButton {...defaultProps} /></IntlProvider>);
    const button = screen.getByRole('button', { name: 'View Course' });
    expect(button).toHaveClass('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});
