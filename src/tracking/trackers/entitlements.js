import { createEventTracker } from 'data/services/segment/utils';
import { eventNames } from '../constants';

/**
 * Create event tracker for leave entitlement session event
 * @param {string} fromCourseRun - course run identifier for leaving course
 * @return {callback} - callback that triggers the event tracker
 */
export const leaveSession = (fromCourseRun) => (
  createEventTracker(eventNames.leaveSession, { fromCourseRun, toCourseRun: null })
);
/**
 * Create event tracker for new entitlement session event
 * @param {string} toCourseRun - course run identifier for new course
 * @return {callback} - callback that triggers the event tracker
 */
export const newSession = (toCourseRun) => (
  createEventTracker(eventNames.newSession, { fromCourseRun: null, toCourseRun })
);
/**
 * Create event tracker for switch entitlement session event
 * @param {string} fromCourseRun - course run identifier for leaving course
 * @param {string} toCourseRun - course run identifier for new course
 * @return {callback} - callback that triggers the event tracker
 */
export const switchSession = (fromCourseRun, toCourseRun) => (
  createEventTracker(eventNames.switchSession, { fromCourseRun, toCourseRun })
);

export default {
  leaveSession,
  newSession,
  switchSession,
};
