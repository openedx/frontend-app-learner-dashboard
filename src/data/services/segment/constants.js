import { StrictDict } from 'utils';

export const events = StrictDict({
  courseEnroll: 'courseEnroll',
  entitlementUnenroll: 'entitlementUnenroll',
  sessionChange: 'sessionChange',
  unenrollReason: 'unenrollReason',
  upgradeCourse: 'upgradeCourse',
  searchCourse: 'searchCourse',
});

export const eventNames = StrictDict({
  [events.courseEnroll]: 'edx.bi.user.program-details.enrollment',
  [events.upgradeCourse]: 'learner_home.course_card.upgrade',
  [events.entitlementUnenroll]: 'entitlement_unenrollment_reason.selected',
  [events.sessionChange]: ({ action }) => `course-dashboard.${action}-session`, // 'switch', 'new', 'leave'
  [events.unenrollReason]: 'unenrollment_reason.selected',
  [events.searchCourse]: 'learner_home.widget.search_course',
});

export const trackingCategory = 'learner-home';

export const pageViewEvent = { category: trackingCategory };
