import { categories, eventNames } from '../constants';
import { createEventTracker } from '../utils';

/** User Engagements events **/
const engagementOptions = { category: categories.userEngagement, displayName: 'v1' };
export const unenrollReason = (courseId, reason, isEntitlement) => () => createEventTracker(
  isEntitlement ? eventNames.entitlementUnenrollReason : eventNames.unenrollReason,
  { reason, course_id: courseId, ...engagementOptions },
);

export default {
  unenrollReason,
};
