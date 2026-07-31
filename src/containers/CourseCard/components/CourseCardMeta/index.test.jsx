import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useCourseData } from 'hooks';
import CourseCardMeta from '.';
import messages from './messages';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useCourseCardMeta from './hooks';

describe('CourseCardMeta', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCourseData.mockReturnValue({
      course: { shortDescription: 'Learn React fundamentals.' },
      courseProvider: { name: 'SSED' },
    });
  });

  it('shows days overdue status line when course is overdue', () => {
    useCourseCardMeta.mockReturnValue({
      contentType: 'Video',
      durationLabel: '4 hours',
      dueDateLabel: 'Due: Apr 5, 2026',
      rating: 4.5,
      isOverdue: true,
      daysOverdue: 3,
      hasStarted: true,
      progressPercent: 35,
    });

    render(
      <IntlProvider locale="en">
        <CourseCardMeta cardId="card-0" />
      </IntlProvider>,
    );

    expect(screen.getByText('3 days overdue')).toBeInTheDocument();
    expect(screen.queryByText(messages.overdueStatusMessage.defaultMessage)).toBeNull();
  });
});
