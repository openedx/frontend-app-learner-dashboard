import { categories, eventNames } from 'data/services/segment/constants';
import { createEventTracker } from 'data/services/segment/utils';

/** User Engagements events **/
const engagementOptions = { category: categories.userEngagement, displayName: 'v1' };
export const unenrollReason = (courseId, reason, isEntitlement) => () => createEventTracker(
  isEntitlement ? eventNames.entitlementUnenrollReason : eventNames.unenrollReason,
  { reason, course_id: courseId, ...engagementOptions },
);

export default {
  unenrollReason,
};
