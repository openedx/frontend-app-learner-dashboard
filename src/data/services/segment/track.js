import { categories, eventNames } from './constants';
import { trackEvent } from './utils';

export const enterCourseClicked = (courseId) => () => trackEvent(
  eventNames.enterCourseClicked,
  { category: categories.dashboard, label: courseId },
);
export const courseTitleClicked = (courseId) => () => trackEvent(
  eventNames.courseTitleClicked,
  { category: categories.dashboard, label: courseId },
);
export const courseOptionsDropdownClicked = (courseId) => () => trackEvent(
  eventNames.courseOptionsDropdownClicked,
  { category: categories.dashboard, label: courseId },
);
export const courseImageClicked = (courseId) => () => trackEvent(
  eventNames.courseImageClicked,
  { category: categories.dashboard, label: courseId },
);
export const upgradeClicked = (courseId) => () => {
  trackEvent(
    eventNames.upgradeButtonClicked,
    { category: categories.upgrade, label: courseId },
  );
  trackEvent(eventNames.upgradeButtonClickedEnrollment, { location: 'learner_dashboard' });
  trackEvent(eventNames.upgradeButtonClickedUpsell, {
    linkName: 'course_dashboard_green',
    linkType: 'button',
    pageName: 'course_dashboard',
    linkCategory: 'green_update',
  });
};

export const shareClicked = (courseId, site) => () => trackEvent(
  eventNames.shareClicked,
  { course_id: courseId, social_media_site: site, location: 'dashboard' },
);

export const newEntitlementEnrollment = (selection) => () => {
  trackEvent(eventNames.newSession, { fromCourseRun: null, toCourseRun: selection });
};

export const switchEntitlementSession = (fromCourseRun, toCourseRun) => () => {
  trackEvent(eventNames.switchSession, {
    fromCourseRun,
    toCourseRun,
  });
};

export const leaveEntitlementSession = (fromCourseRun) => () => {
  trackEvent(eventNames.leaveSession, {
    fromCourseRun,
    toCourseRun: null,
  });
};

export const unenrollReason = (courseId, reason) => () => trackEvent(
  eventNames.unenrollReason,
  {
    category: categories.userEngagement,
    reason,
    displayName: 'v1',
    course_id: courseId,
  },
);

export const entitlementUnenrollReason = (courseId, reason) => () => trackEvent(
  eventNames.entitlementUnenrollReason,
  {
    category: categories.userEngagement,
    reason,
    displayName: 'v1',
  },
);

export const enterpriseDashboardModalOpened = (enterpriseUUID) => () => trackEvent(
  eventNames.enterpriseDashboardModalOpened,
  { enterpriseUUID },
);
export const enterpriseDashboardModalCTAClicked = (enterpriseUUID) => () => trackEvent(
  eventNames.enterpriseDashboardModalCTAClicked,
  { enterpriseUUID },
);
export const enterpriseDashboardModalClosed = (enterpriseUUID) => () => trackEvent(
  eventNames.enterpriseDashboardModalClosed,
  { enterpriseUUID, source: 'Escape' },
);
