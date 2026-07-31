export const DUE_SOON_WINDOW_DAYS = 7;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Deterministic per-card day offset (relative to today) used only when no real due date
// exists, so a list of cards shows a mix of overdue / due-soon / on-track states.
export const placeholderDueDateOffset = (cardId) => {
  const index = Number(String(cardId).replace(/\D/g, '')) || 0;
  const cycleDays = [-10, 3, 21, -2, 9];
  return cycleDays[index % cycleDays.length];
};

export const resolveDueDate = (course, cardId, now = Date.now()) => {
  if (course?.dueDate) {
    return new Date(course.dueDate);
  }
  const placeholder = new Date(now);
  placeholder.setDate(placeholder.getDate() + placeholderDueDateOffset(cardId));
  return placeholder;
};

export const getDueStatus = (dueDate, now = Date.now()) => {
  const daysUntilDue = Math.ceil((dueDate.getTime() - now) / MS_PER_DAY);
  const isOverdue = daysUntilDue < 0;
  const daysOverdue = isOverdue ? Math.abs(daysUntilDue) : 0;
  const isDueSoon = !isOverdue && daysUntilDue <= DUE_SOON_WINDOW_DAYS;

  return {
    daysUntilDue,
    daysOverdue,
    isOverdue,
    isDueSoon,
  };
};

export const getDueStatusFromCourseRecord = (courseRecord, now = Date.now()) => {
  const { cardId, course } = courseRecord;
  const dueDate = resolveDueDate(course, cardId, now);
  return getDueStatus(dueDate, now);
};

export const partitionByDueStatus = (courses, now = Date.now()) => {
  const overdue = [];
  const nonOverdue = [];

  courses.forEach((courseRecord) => {
    if (getDueStatusFromCourseRecord(courseRecord, now).isOverdue) {
      overdue.push(courseRecord);
    } else {
      nonOverdue.push(courseRecord);
    }
  });

  return { overdue, nonOverdue };
};

export const filterNonOverdueCourses = (courses, now = Date.now()) => (
  partitionByDueStatus(courses, now).nonOverdue
);

export const getOverdueCourses = (courses, now = Date.now()) => (
  partitionByDueStatus(courses, now).overdue
);
