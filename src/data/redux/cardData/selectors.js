import { keyStore, StrictDict } from 'utils';

import app from 'data/redux/app/selectors';
// import * as module from './selectors';

const mkCardSelector = (sel) => (state, courseNumber) => (
  sel(app.courseCardData(state, courseNumber))
);

export const fieldSelectors = {
  canChangeEntitlementSession: data => data.entitlements.canChange,
  canUpgrade: data => data.enrollment.canUpgrade,
  certAvailableDate: data => data.certificates.availableDate,
  certDownloadUrl: data => data.certificates.downloadUrls?.download,
  certPreviewUrl: data => data.certificates.downloadUrls?.preview,
  courseBannerUrl: data => data.course.bannerUrl,
  courseRunAccessExpirationDate: data => data.courseRun.accessExpirationDate,
  courseRunEndDate: data => data.courseRun?.endDate,
  courseTitle: data => data.course.title,
  courseWebsite: data => data.course.website,
  entitlementSessions: data => data.entitlements.availableSessions,
  isAudit: data => data.enrollment.isAudit,
  isAuditAccessExpired: data => data.enrollment.isAuditAccessExpired,
  isCertDownloadable: data => data.certificates.isDownloadable,
  isCertEarnedButUnavailable: ({ certificates: { isEarned, isAvailable } }) => (
    isEarned && !isAvailable
  ),
  isCourseRunPending: data => data.courseRun.isPending,
  isCourseRunStarted: data => data.courseRun.isStarted,
  isCourseRunFinished: data => data.courseRun.isFinished,
  isEmailEnabled: data => data.enrollment.isEmailEnabled,
  isEntitlement: data => data.entitlements.isEntitlement,
  isEntitlementExpired: data => data.entitlements.isExpired,
  isEntitlementFulfilled: data => data.entitlements.isFulfilled,
  isVerified: data => data.enrollment.isVerified,
  isRestricted: data => data.certificates.isRestricted,
  isPassing: data => data.grades.isPassing,
  minPassingGrade: data => data.courseRun.minPassingGrade,
  providerName: data => data.provider?.name,
  relatedPrograms: data => data.relatedPrograms,
};
fieldSelectors.isCourseRunActive = data => (
  fieldSelectors.isCourseRunStarted(data) && !fieldSelectors.isCourseRunFinished(data)
);

export const programs = StrictDict({
  estimatedNumberOfWeeks: data => data.estimatedNumberOfWeeks,
  numberOfCourses: data => data.numberOfCourses,
  programType: data => data.programType,
  programTypeUrl: data => data.programTypeUrl,
  provider: data => data.provider,
  title: data => data.title,
});

export const fieldKeys = keyStore(fieldSelectors);

export const cardSelectors = Object.keys(fieldSelectors).reduce(
  (obj, key) => ({ ...obj, [key]: mkCardSelector(fieldSelectors[key]) }),
  {},
);

export default StrictDict({
  ...cardSelectors,
  programs,
  fieldKeys,
});
