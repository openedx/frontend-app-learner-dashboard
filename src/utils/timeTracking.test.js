import {
  getStoredTimeSpent, getSecondsSpentByCourseId, getTotalTimeSpent, formatTimeSpent,
} from './timeTracking';

describe('timeTracking', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('getStoredTimeSpent', () => {
    it('returns 0 when nothing is stored for the course', () => {
      expect(getStoredTimeSpent('course-1')).toBe(0);
    });

    it('returns 0 when no courseId is given', () => {
      expect(getStoredTimeSpent(undefined)).toBe(0);
    });

    it('returns the stored value for the course', () => {
      window.localStorage.setItem('edx.timeTracking.course.course-1', '150');
      expect(getStoredTimeSpent('course-1')).toBe(150);
    });

    it('returns 0 for a non-numeric stored value', () => {
      window.localStorage.setItem('edx.timeTracking.course.course-1', 'not-a-number');
      expect(getStoredTimeSpent('course-1')).toBe(0);
    });
  });

  describe('getTotalTimeSpent', () => {
    it('sums stored time across all courses that have a courseRun.courseId', () => {
      window.localStorage.setItem('edx.timeTracking.course.course-1', '100');
      window.localStorage.setItem('edx.timeTracking.course.course-2', '50');
      const courses = [
        { courseRun: { courseId: 'course-1' } },
        { courseRun: { courseId: 'course-2' } },
        { courseRun: null },
        {},
      ];
      expect(getTotalTimeSpent(courses)).toBe(150);
    });

    it('returns 0 for an empty course list', () => {
      expect(getTotalTimeSpent([])).toBe(0);
    });

    it('prefers the real backend total over localStorage when one is given', () => {
      window.localStorage.setItem('edx.timeTracking.course.course-1', '100');
      window.localStorage.setItem('edx.timeTracking.course.course-2', '50');
      const courses = [
        { courseRun: { courseId: 'course-1' } },
        { courseRun: { courseId: 'course-2' } },
      ];
      const secondsSpentByCourseId = { 'course-1': 9000 };
      expect(getTotalTimeSpent(courses, secondsSpentByCourseId)).toBe(9050);
    });

    it('treats a real backend value of 0 as authoritative rather than falling back', () => {
      window.localStorage.setItem('edx.timeTracking.course.course-1', '100');
      const courses = [{ courseRun: { courseId: 'course-1' } }];
      expect(getTotalTimeSpent(courses, { 'course-1': 0 })).toBe(0);
    });
  });

  describe('getSecondsSpentByCourseId', () => {
    it('builds a courseId -> secondsSpent map, skipping entries without both fields', () => {
      const completionData = [
        { courseId: 'course-1', secondsSpent: 120 },
        { courseId: 'course-2', secondsSpent: 0 },
        { courseId: 'course-3', secondsSpent: null },
        { courseId: null, secondsSpent: 50 },
      ];
      expect(getSecondsSpentByCourseId(completionData)).toEqual({
        'course-1': 120,
        'course-2': 0,
      });
    });

    it('returns an empty object for missing/empty input', () => {
      expect(getSecondsSpentByCourseId(undefined)).toEqual({});
      expect(getSecondsSpentByCourseId([])).toEqual({});
    });
  });

  describe('formatTimeSpent', () => {
    it('formats sub-hour durations as minutes only', () => {
      expect(formatTimeSpent(0)).toBe('0m');
      expect(formatTimeSpent(59)).toBe('0m');
      expect(formatTimeSpent(600)).toBe('10m');
    });

    it('formats durations over an hour as hours and minutes', () => {
      expect(formatTimeSpent(5400)).toBe('1h 30m');
      expect(formatTimeSpent(7200)).toBe('2h 0m');
    });
  });
});
