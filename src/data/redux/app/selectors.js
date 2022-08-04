import { createSelector } from 'reselect';

import { StrictDict } from 'utils';

import * as module from './selectors';

export const appSelector = (state) => state.app;

const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = {
  enrollments: mkSimpleSelector(app => app.enrollments),
  entitlements: mkSimpleSelector(app => app.entitlements),
  courseData: mkSimpleSelector(app => app.courseData),
  platformSettings: mkSimpleSelector(app => app.platformSettings),
  suggestedCourses: mkSimpleSelector(app => app.suggestedCourses),
  emailConfirmation: mkSimpleSelector(app => app.emailConfirmation),
  enterpriseDashboards: mkSimpleSelector(app => app.enterpriseDashboards),
};

export const courseCardData = (state, courseNumber) => (
  module.simpleSelectors.courseData(state)[courseNumber]
);

const mkCardSelector = (sel) => (state, courseNumber) => (
  sel(courseCardData(state, courseNumber))
);

const dateSixMonthsFromNow = new Date();
dateSixMonthsFromNow.setDate(dateSixMonthsFromNow.getDate() + 180);

export const courseCard = StrictDict({
  certificates: mkCardSelector(({ certificates }) => ({
    availableDate: certificates.availableDate,
    certDownloadUrl: certificates.certDownloadUrl,
    honorCertDownloadUrl: certificates.honorCertDownloadUrl,
    certPreviewUrl: certificates.certPreviewUrl,
    isDownloadable: certificates.isDownloadable,
    isEarnedButUnavailable: certificates.isEarned && !certificates.isAvailable,
    isRestricted: certificates.isRestricted,
  })),
  course: mkCardSelector(({ course }) => ({
    bannerUrl: course.bannerUrl,
    title: course.title,
    website: course.website,
  })),
  courseRun: mkCardSelector(({ courseRun }) => ({
    endDate: courseRun?.endDate,
    isArchived: courseRun.isArchived,
    isStarted: courseRun.isStarted,
    isFinished: courseRun.isFinished,
    minPassingGrade: courseRun.minPassingGrade,
  })),
  enrollment: mkCardSelector(({ enrollment }) => ({
    accessExpirationDate: enrollment.accessExpirationDate,
    canUpgrade: enrollment.canUpgrade,
    hasStarted: enrollment.hasStarted,
    isAudit: enrollment.isAudit,
    isAuditAccessExpired: enrollment.isAuditAccessExpired,
    isEmailEnabled: enrollment.isEmailEnabled,
    isVerified: enrollment.isVerified,
    lastEnrolled: enrollment.lastEnrollment,
    isEnrolled: enrollment.isEnrolled,
  })),
  entitlements: mkCardSelector(({ entitlements }) => {
    const deadline = new Date(entitlements.changeDeadline);
    const showExpirationWarning = deadline > new Date() && deadline <= dateSixMonthsFromNow;
    return {
      canChange: entitlements.canChange,
      entitlementSessions: entitlements.availableSessions,
      isEntitlement: entitlements.isEntitlement,
      isExpired: entitlements.isExpired,
      isFulfilled: entitlements.isFulfilled,
      hasSessions: entitlements.availableSessions?.length > 0,
      changeDeadline: entitlements.changeDeadline,
      showExpirationWarning,
    };
  }),
  grades: mkCardSelector(({ grades }) => ({ isPassing: grades.isPassing })),
  provider: mkCardSelector(({ provider }) => ({ name: provider?.name })),
  relatedPrograms: mkCardSelector(({ relatedPrograms }) => ({
    list: relatedPrograms.map(program => ({
      bannerUrl: program.bannerUrl,
      estimatedNumberOfWeeks: program.estimatedNumberOfWeeks,
      logoUrl: program.logoUrl,
      numberOfCourses: program.numberOfCourses,
      programType: program.programType,
      programUrl: program.programUrl,
      provider: program.provider,
      title: program.title,
    })),
    length: relatedPrograms.length,
  })),
});

export default StrictDict({
  ...simpleSelectors,
  courseCard,
});
