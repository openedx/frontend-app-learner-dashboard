import { keyStore, StrictDict } from 'utils';

import app from 'data/redux/app/selectors';
// import * as module from './selectors';

const mkCardSelector = (sel) => (state, courseNumber) => (
  sel(app.courseCardData(state, courseNumber))
);

export const fieldSelectors = {
  courseTitle: data => data.course.title,
  courseBannerUrl: data => data.course.bannerUrl,
  courseRunAccessExpirationDate: data => data.courseRun.accessExpirationDate,
  courseRunEndDate: data => data.courseRun?.endDate,
  courseWebsite: data => data.course?.website,
  providerName: data => data.provider?.name,
  isVerified: data => data.enrollment.isVerified,
  isAudit: data => data.enrollment.isAudit,
  isAuditAccessExpired: data => data.enrollment.isAuditAccessExpired,
  isCourseRunPending: data => data.courseRun.isPending,
  isCourseRunStarted: data => data.courseRun.isStarted,
  isCourseRunFinished: data => data.courseRun.isFinished,
  isEmailEnabled: data => data.enrollment.isEmailEnabled,
  canUpgrade: data => data.enrollment.canUpgrade,
  isRestricted: data => data.certificates.isRestricted,
  isPassing: data => data.grades.isPassing,
  minPassingGrade: data => data.courseRun.minPassingGrade,
  isCertDownloadable: data => data.certificates.isDownloadable,
  certDownloadUrl: data => data.certificates.downloadUrls?.download,
  certPreviewUrl: data => data.certificates.downloadUrls?.preview,
  isCertEarnedButUnavailable: ({ certificates: { isEarned, isAvailable } }) => (
    isEarned && !isAvailable
  ),
  certAvailableDate: data => data.certificates.availableDate,
  isEntitlement: data => data.entitlements.isEntitlement,
  isEntitlementFulfilled: data => data.entitlements.isFulfilled,
  isEntitlementExpired: data => data.entitlements.isExpired,
  canChangeEntitlementSession: data => data.entitlements.canChange,
  entitlementSessions: data => data.entitlements.availableSessions,
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

export const cardSelector = (sel, courseNumber) => (state) => sel(state, courseNumber);

export default StrictDict({
  cardSelector,
  ...cardSelectors,
  programs,
  fieldKeys,
});
