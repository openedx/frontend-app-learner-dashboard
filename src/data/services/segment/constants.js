import { StrictDict } from 'utils';

export const events = StrictDict({
  courseEnroll: 'courseEnroll',
  entitlementUnenroll: 'entitlementUnenroll',
  sessionChange: 'sessionChange',
  unenrollReason: 'unenrollReason',
});

export const eventNames = StrictDict({
  [events.courseEnroll]: 'edx.bi.user.program-details.enrollment',
  [events.entitlementUnenroll]: 'entitlement_unenrollment_reason.selected',
  [events.sessionChange]: ({ action }) => `course-dashboard.${action}-session`, // 'switch', 'new', 'leave'
  [events.unenrollReason]: 'unenrollment_reason.selected',
});

export const trackingCategory = 'learner-home';

export const pageViewEvent = { category: trackingCategory };
