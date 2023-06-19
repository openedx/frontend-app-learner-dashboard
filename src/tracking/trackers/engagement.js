import { createEventTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';

export const engagementOptions = {
  category: categories.userEngagement,
  displayName: 'v1',
};

/**
 * Creates callback which sends segment event for unenroll with reason event
 * @param {string} courseId - course run identifier
 * @param {string} reason - unenroll reason
 * @param {bool} isEntitlement - is the course an entitlement course?
 * @return {callback} - callback that will send the appropriate segment message.
 */
export const unenrollReason = (courseId, reason, isEntitlement) => createEventTracker(
  isEntitlement ? eventNames.entitlementUnenrollReason : eventNames.unenrollReason,
  { reason, course_id: courseId, ...engagementOptions },
);

export default {
  unenrollReason,
};
