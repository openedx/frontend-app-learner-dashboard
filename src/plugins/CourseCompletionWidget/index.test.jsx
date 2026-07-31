import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useInitializeLearnerHome, useCourseCompletion } from 'data/hooks';
import CourseCompletionWidget from '.';
import messages from './messages';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
  useCourseCompletion: jest.fn(),
}));

jest.mock('utils/dataTransformers', () => ({
  getTransformedCourseDataList: jest.fn(() => ([
    {
      courseRun: {
        courseId: 'course-v1:OpenLMS+REACT101+2026',
        homeUrl: 'http://apps.local.openedx.io:2000/learning/course/course-v1:OpenLMS+REACT101+2026/home',
      },
    },
  ])),
}));

const completionRows = [
  {
    courseId: 'course-v1:OpenLMS+REACT101+2026',
    title: 'React 101',
    completion: 42,
    dueDate: '2026-04-05T23:59:00+00:00',
  },
  {
    courseId: 'course-v1:OpenLMS+NODE201+2026',
    title: 'Node 201',
    completion: 10,
    dueDate: null,
  },
  {
    courseId: 'course-v1:Opswerks+CS201+2017_T1',
    title: 'CS 201',
    completion: 0,
    dueDate: '2026-05-01T00:00:00+00:00',
  },
  {
    courseId: 'course-v1:Opswerks+ESAF+2017_T1',
    title: 'ESAF',
    completion: 75,
    dueDate: null,
  },
];

const renderWidget = () => render(
  <IntlProvider locale="en"><CourseCompletionWidget /></IntlProvider>,
);

describe('CourseCompletionWidget', () => {
  beforeEach(() => {
    useInitializeLearnerHome.mockReturnValue({ data: { courses: [] } });
  });

  it('renders nothing while loading', () => {
    useCourseCompletion.mockReturnValue({ data: undefined, isLoading: true, isError: false });
    const { container } = renderWidget();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing on error', () => {
    useCourseCompletion.mockReturnValue({ data: undefined, isLoading: false, isError: true });
    const { container } = renderWidget();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there is no completion data', () => {
    useCourseCompletion.mockReturnValue({ data: [], isLoading: false, isError: false });
    const { container } = renderWidget();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders heading, course rows, and range for completion data', () => {
    useCourseCompletion.mockReturnValue({
      data: completionRows.slice(0, 2),
      isLoading: false,
      isError: false,
    });
    renderWidget();

    expect(screen.getByText(messages.widgetTitle.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText('React 101')).toBeInTheDocument();
    expect(screen.getByText('Node 201')).toBeInTheDocument();
    expect(screen.getByText('42% Completed')).toBeInTheDocument();
    expect(screen.getByText('10% Completed')).toBeInTheDocument();
    expect(screen.getByText('1-2 of 2 items')).toBeInTheDocument();
  });

  it('paginates when there are more than three items', () => {
    useCourseCompletion.mockReturnValue({
      data: completionRows,
      isLoading: false,
      isError: false,
    });
    renderWidget();

    expect(screen.getByText('1-3 of 4 items')).toBeInTheDocument();
    expect(screen.getByText('React 101')).toBeInTheDocument();
    expect(screen.queryByText('ESAF')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    expect(screen.getByText('4-4 of 4 items')).toBeInTheDocument();
    expect(screen.getByText('ESAF')).toBeInTheDocument();
    expect(screen.queryByText('React 101')).not.toBeInTheDocument();
  });
});
