import { renderHook } from '@testing-library/react';
import { useInitializeLearnerHome, useCourseCompletion } from 'data/hooks';
import { useProgressSummaryData } from './hooks';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
  useCourseCompletion: jest.fn(),
}));

const course = ({ isArchived = false, hasStarted = false } = {}) => ({
  courseRun: { isArchived },
  enrollment: { hasStarted },
});

describe('useProgressSummaryData', () => {
  beforeEach(() => {
    useCourseCompletion.mockReturnValue({ data: undefined });
  });

  it('returns all zeros when there are no courses', () => {
    useInitializeLearnerHome.mockReturnValue({ data: { courses: [] } });
    const { result } = renderHook(() => useProgressSummaryData());
    expect(result.current).toEqual({
      total: 0, completed: 0, inProgress: 0, overallProgress: 0, totalTimeSpent: 0,
    });
  });

  it('counts completed, in-progress, and computes overall progress', () => {
    useInitializeLearnerHome.mockReturnValue({
      data: {
        courses: [
          course({ isArchived: true }),
          course({ isArchived: true }),
          course({ hasStarted: true }),
          course(),
        ],
      },
    });
    const { result } = renderHook(() => useProgressSummaryData());
    expect(result.current).toEqual({
      total: 4, completed: 2, inProgress: 1, overallProgress: 50, totalTimeSpent: 0,
    });
  });

  it('does not count an archived course as in progress even if started', () => {
    useInitializeLearnerHome.mockReturnValue({
      data: { courses: [course({ isArchived: true, hasStarted: true })] },
    });
    const { result } = renderHook(() => useProgressSummaryData());
    expect(result.current).toEqual({
      total: 1, completed: 1, inProgress: 0, overallProgress: 100, totalTimeSpent: 0,
    });
  });

  it('sums stored time spent (in seconds) across all courses with a courseRun.courseId', () => {
    const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
      if (key === 'edx.timeTracking.course.course-1') { return '120'; }
      if (key === 'edx.timeTracking.course.course-2') { return '300'; }
      return null;
    });
    useInitializeLearnerHome.mockReturnValue({
      data: {
        courses: [
          { ...course(), courseRun: { isArchived: false, courseId: 'course-1' } },
          { ...course(), courseRun: { isArchived: false, courseId: 'course-2' } },
        ],
      },
    });
    const { result } = renderHook(() => useProgressSummaryData());
    expect(result.current.totalTimeSpent).toBe(420);
    getItemSpy.mockRestore();
  });

  it('prefers the persisted backend total (secondsSpent) over localStorage', () => {
    const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
      if (key === 'edx.timeTracking.course.course-1') { return '120'; }
      if (key === 'edx.timeTracking.course.course-2') { return '300'; }
      return null;
    });
    useCourseCompletion.mockReturnValue({
      data: [
        { courseId: 'course-1', secondsSpent: 9000 },
        // course-2 hasn't synced to the backend yet, so this should fall back to localStorage.
      ],
    });
    useInitializeLearnerHome.mockReturnValue({
      data: {
        courses: [
          { ...course(), courseRun: { isArchived: false, courseId: 'course-1' } },
          { ...course(), courseRun: { isArchived: false, courseId: 'course-2' } },
        ],
      },
    });
    const { result } = renderHook(() => useProgressSummaryData());
    expect(result.current.totalTimeSpent).toBe(9300);
    getItemSpy.mockRestore();
  });
});
