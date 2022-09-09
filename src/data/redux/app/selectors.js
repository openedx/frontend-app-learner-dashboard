import { createSelector } from 'reselect';

import { StrictDict } from 'utils';
import { FilterKeys } from 'data/constants/app';

import * as module from './selectors';

export const appSelector = (state) => state.app;

const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = {
  courseData: mkSimpleSelector(app => app.courseData),
  platformSettings: mkSimpleSelector(app => app.platformSettings),
  suggestedCourses: mkSimpleSelector(app => app.suggestedCourses),
  emailConfirmation: mkSimpleSelector(app => app.emailConfirmation),
  enterpriseDashboard: mkSimpleSelector(app => app.enterpriseDashboard),
  selectSessionModal: mkSimpleSelector(app => app.selectSessionModal),
};

export const numCourses = createSelector(
  [module.simpleSelectors.courseData],
  (courseData) => Object.keys(courseData).length,
);
export const hasCourses = createSelector([module.numCourses], (num) => num > 0);
export const hasAvailableDashboards = createSelector(
  [module.simpleSelectors.enterpriseDashboard],
  (data) => data !== null,
);
export const showSelectSessionModal = createSelector(
  [module.simpleSelectors.selectSessionModal],
  (data) => data.cardId != null,
);

export const courseCardData = (state, cardId) => (
  module.simpleSelectors.courseData(state)[cardId]
);

const mkCardSelector = (sel) => (state, cardId) => {
  const cardData = module.courseCardData(state, cardId);
  return sel(cardData);
};

const dateSixMonthsFromNow = new Date();
dateSixMonthsFromNow.setDate(dateSixMonthsFromNow.getDate() + 180);

export const courseCard = StrictDict({
  certificates: mkCardSelector(({ certificates }) => ({
    availableDate: certificates.availableDate,
    certPreviewUrl: certificates.certPreviewUrl,
    isDownloadable: certificates.isDownloadable,
    isEarnedButUnavailable: certificates.isEarned && !certificates.isAvailable,
    isRestricted: certificates.isRestricted,
  })),
  course: mkCardSelector(({ course }) => ({
    bannerUrl: course.bannerUrl,
    courseNumber: course.courseNumber,
    title: course.title,
    website: course.website,
  })),
  courseRun: mkCardSelector(({ courseRun }) => (courseRun === null ? {} : {
    endDate: courseRun?.endDate,
    courseId: courseRun.courseId,
    isArchived: courseRun.isArchived,
    isStarted: courseRun.isStarted,
    isFinished: courseRun.isFinished,
    minPassingGrade: courseRun.minPassingGrade,
    startDate: courseRun.startDate,
  })),
  enrollment: mkCardSelector(({ enrollment }) => {
    if (enrollment == null) {
      return {
        isEnrolled: false,
      };
    }
    return {
      accessExpirationDate: enrollment.accessExpirationDate,
      canUpgrade: enrollment.canUpgrade,
      hasStarted: enrollment.hasStarted,
      hasFinished: enrollment.hasFinished,
      isAudit: enrollment.isAudit,
      isAuditAccessExpired: enrollment.isAuditAccessExpired,
      isEmailEnabled: enrollment.isEmailEnabled,
      isVerified: enrollment.isVerified,
      lastEnrolled: enrollment.lastEnrollment,
      isEnrolled: enrollment.isEnrolled,
    };
  }),
  entitlement: mkCardSelector(({ entitlement }) => {
    if (!entitlement) {
      return {};
    }
    const deadline = new Date(entitlement.changeDeadline);
    const deadlinePassed = deadline < new Date();
    const showExpirationWarning = !deadlinePassed && deadline <= dateSixMonthsFromNow;
    return {
      canChange: !deadlinePassed,
      canViewCourse: entitlement.canViewCourse,
      entitlementessions: entitlement.availableSessions,
      isEntitlement: entitlement.isEntitlement,
      isExpired: entitlement.isExpired,
      isFulfilled: entitlement.isFulfilled,
      hasSessions: entitlement.availableSessions?.length > 0,
      changeDeadline: entitlement.changeDeadline,
      uuid: entitlement.uuid,
      showExpirationWarning,
    };
  }),
  grades: mkCardSelector(({ grades }) => ({ isPassing: grades.isPassing })),
  provider: mkCardSelector(({ provider }) => ({ name: provider?.name })),
  relatedPrograms: mkCardSelector(({ relatedPrograms }) => ({
    list: relatedPrograms.map(program => ({
      bannerUrl: program.bannerUrl,
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

export const currentList = (state, {
  sortBy,
  isAscending,
  filters,
  pageNumber,
  pageSize,
}) => {
  let list = Object.values(module.simpleSelectors.courseData(state));
  const hasFilter = filters.reduce((obj, filter) => ({ ...obj, [filter]: true }), {});
  if (filters.length) {
    list = list.filter(course => {
      if (hasFilter[FilterKeys.notEnrolled]) {
        if (course.enrollment.isEnrolled) {
          return false;
        }
      }
      if (hasFilter[FilterKeys.done]) {
        if (!course.enrollment.hasFinished) {
          return false;
        }
      }
      if (hasFilter[FilterKeys.upgraded]) {
        if (!course.enrollment.isVerified) {
          return false;
        }
      }
      if (hasFilter[FilterKeys.inProgress]) {
        if (!course.enrollment.hasStarted) {
          return false;
        }
      }
      if (hasFilter[FilterKeys.notStarted]) {
        if (course.enrollment.hasStarted) {
          return false;
        }
      }
      return true;
    });
  }
  if (sortBy === 'enrolled') {
    list = list.sort((a, b) => {
      const dateA = new Date(a.enrollment.lastEnrolled);
      const dateB = new Date(b.enrollment.lastEnrolled);
      if (dateA < dateB) { return isAscending ? -1 : 1; }
      if (dateA > dateB) { return isAscending ? 1 : 1; }
      return 0;
    });
  } else {
    list = list.sort((a, b) => {
      const titleA = a.course.title.toLowerCase();
      const titleB = b.course.title.toLowerCase();
      if (titleA < titleB) { return isAscending ? -1 : 1; }
      if (titleA > titleB) { return isAscending ? 1 : 1; }
      return 0;
    });
  }
  return {
    visible: list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    numPages: Math.ceil(list.length / pageSize),
  };
};

export default StrictDict({
  ...simpleSelectors,
  courseCard,
  currentList,
  hasCourses,
  hasAvailableDashboards,
  showSelectSessionModal,
});
