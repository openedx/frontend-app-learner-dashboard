import {
  getDueStatus,
  getDueStatusFromCourseRecord,
  getOverdueCourses,
  filterNonOverdueCourses,
  partitionByDueStatus,
  placeholderDueDateOffset,
  resolveDueDate,
} from './dueDate';

describe('dueDate utils', () => {
  const fixedNow = new Date('2026-07-23T12:00:00Z').getTime();

  describe('placeholderDueDateOffset', () => {
    it('returns deterministic offsets per card id', () => {
      expect(placeholderDueDateOffset('card-0')).toBe(-10);
      expect(placeholderDueDateOffset('card-1')).toBe(3);
      expect(placeholderDueDateOffset('card-5')).toBe(-10);
    });
  });

  describe('resolveDueDate', () => {
    it('uses course dueDate when present', () => {
      const dueDate = resolveDueDate(
        { dueDate: '2026-04-05T00:00:00Z' },
        'card-0',
        fixedNow,
      );
      expect(dueDate.toISOString()).toBe('2026-04-05T00:00:00.000Z');
    });

    it('falls back to placeholder offset when dueDate is missing', () => {
      const dueDate = resolveDueDate({}, 'card-0', fixedNow);
      const expected = new Date(fixedNow);
      expected.setDate(expected.getDate() + placeholderDueDateOffset('card-0'));
      expect(dueDate.getTime()).toBe(expected.getTime());
    });
  });

  describe('getDueStatus', () => {
    it('marks past due dates as overdue with day count', () => {
      const dueDate = new Date('2026-07-20T12:00:00Z');
      expect(getDueStatus(dueDate, fixedNow)).toEqual({
        daysUntilDue: -3,
        daysOverdue: 3,
        isOverdue: true,
        isDueSoon: false,
      });
    });

    it('marks courses due within 7 days as due soon', () => {
      const dueDate = new Date('2026-07-28T12:00:00Z');
      expect(getDueStatus(dueDate, fixedNow)).toEqual({
        daysUntilDue: 5,
        daysOverdue: 0,
        isOverdue: false,
        isDueSoon: true,
      });
    });

    it('marks courses due later as on track', () => {
      const dueDate = new Date('2026-08-10T12:00:00Z');
      expect(getDueStatus(dueDate, fixedNow)).toEqual({
        daysUntilDue: 18,
        daysOverdue: 0,
        isOverdue: false,
        isDueSoon: false,
      });
    });
  });

  describe('partitionByDueStatus', () => {
    const courses = [
      { cardId: 'card-0', course: { dueDate: '2026-07-20T00:00:00Z' } },
      { cardId: 'card-1', course: { dueDate: '2026-08-01T00:00:00Z' } },
      { cardId: 'card-2', course: {} },
    ];

    it('splits overdue and non-overdue courses', () => {
      const { overdue, nonOverdue } = partitionByDueStatus(courses, fixedNow);
      expect(overdue.map(({ cardId }) => cardId)).toEqual(['card-0']);
      expect(nonOverdue.map(({ cardId }) => cardId)).toEqual(['card-1', 'card-2']);
    });

    it('getOverdueCourses returns only overdue items', () => {
      expect(getOverdueCourses(courses, fixedNow)).toHaveLength(1);
    });

    it('filterNonOverdueCourses excludes overdue items', () => {
      expect(filterNonOverdueCourses(courses, fixedNow)).toHaveLength(2);
    });

    it('getDueStatusFromCourseRecord delegates to course record fields', () => {
      expect(getDueStatusFromCourseRecord(courses[0], fixedNow).isOverdue).toBe(true);
    });
  });
});
