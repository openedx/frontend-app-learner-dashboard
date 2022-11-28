import { eventNames } from 'data/services/segment/constants';
import { createEventTracker } from 'data/services/segment/utils';

/** Entitlement Session Enrollment events **/
export const leaveSession = (fromCourseRun) => () => {
  createEventTracker(eventNames.leaveSession, {
    fromCourseRun,
    toCourseRun: null,
  });
};
export const newSession = (selection) => () => {
  createEventTracker(eventNames.newSession, { fromCourseRun: null, toCourseRun: selection });
};
export const switchSession = (fromCourseRun, toCourseRun) => () => {
  createEventTracker(eventNames.switchSession, {
    fromCourseRun,
    toCourseRun,
  });
};

export default {
  leaveSession,
  newSession,
  switchSession,
};
