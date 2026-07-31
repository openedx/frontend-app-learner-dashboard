
const TIME_TRACKING_STORAGE_KEY_PREFIX = 'edx.timeTracking.course.';

export const getStoredTimeSpent = (courseId) => {
  if (!courseId) {
    return 0;
  }
  try {
    const raw = window.localStorage.getItem(`${TIME_TRACKING_STORAGE_KEY_PREFIX}${courseId}`);
    const seconds = parseInt(raw, 10);
    return Number.isNaN(seconds) ? 0 : seconds;
  } catch (error) {
    return 0;
  }
};

export const getSecondsSpentByCourseId = (completionData) => (completionData || []).reduce(
  (acc, { courseId, secondsSpent }) => {
    if (courseId && secondsSpent !== undefined && secondsSpent !== null) {
      acc[courseId] = secondsSpent;
    }
    return acc;
  },
  {},
);

export const getTotalTimeSpent = (courses, secondsSpentByCourseId = {}) => courses.reduce(
  (total, { courseRun } = {}) => {
    const courseId = courseRun?.courseId;
    const realSeconds = secondsSpentByCourseId[courseId];
    const seconds = realSeconds !== undefined ? realSeconds : getStoredTimeSpent(courseId);
    return total + seconds;
  },
  0,
);

export const formatTimeSpent = (totalSeconds) => {
  const totalMinutes = Math.floor((totalSeconds || 0) / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export default {
  getStoredTimeSpent,
  getSecondsSpentByCourseId,
  getTotalTimeSpent,
  formatTimeSpent,
};
