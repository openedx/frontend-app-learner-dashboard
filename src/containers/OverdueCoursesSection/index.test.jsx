import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useInitializeLearnerHome } from 'data/hooks';
import * as dataTransformers from 'utils/dataTransformers';
import * as dueDateUtils from 'utils/dueDate';
import OverdueCoursesSection from '.';
import messages from './messages';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('containers/CourseCard', () => jest.fn(({ cardId }) => (
  <div data-testid="CourseCard">{cardId}</div>
)));

describe('OverdueCoursesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSection = () => render(
    <IntlProvider locale="en">
      <OverdueCoursesSection />
    </IntlProvider>,
  );

  it('renders nothing when there are no overdue courses', () => {
    useInitializeLearnerHome.mockReturnValue({ data: { courses: [{ id: 1 }] } });
    jest.spyOn(dataTransformers, 'getTransformedCourseDataList').mockReturnValue([
      { cardId: 'card-0', course: { dueDate: '2026-08-01T00:00:00Z' } },
    ]);
    jest.spyOn(dueDateUtils, 'getOverdueCourses').mockReturnValue([]);

    renderSection();

    expect(screen.queryByTestId('OverdueCoursesSection')).toBeNull();
  });

  it('renders overdue alert and course cards when overdue courses exist', () => {
    useInitializeLearnerHome.mockReturnValue({ data: { courses: [{ id: 1 }] } });
    jest.spyOn(dataTransformers, 'getTransformedCourseDataList').mockReturnValue([
      { cardId: 'card-0', course: { dueDate: '2026-07-01T00:00:00Z' } },
    ]);
    jest.spyOn(dueDateUtils, 'getOverdueCourses').mockReturnValue([
      { cardId: 'card-0', course: { dueDate: '2026-07-01T00:00:00Z' } },
    ]);

    renderSection();

    expect(screen.getByTestId('OverdueCoursesSection')).toBeInTheDocument();
    expect(screen.getByText(messages.sectionTitle.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(/You have 1 course with missed deadlines/)).toBeInTheDocument();
    expect(screen.getByTestId('CourseCard')).toHaveTextContent('card-0');
  });
});
