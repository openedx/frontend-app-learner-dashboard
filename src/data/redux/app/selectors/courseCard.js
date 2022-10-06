import { StrictDict } from 'utils';
import urls from 'data/services/lms/urls';

import * as simpleSelectors from './simpleSelectors';

const { baseAppUrl, learningMfeUrl } = urls;
const { cardSimpleSelectors, mkCardSelector } = simpleSelectors;

const today = new Date();
const dateSixMonthsFromNow = new Date();
dateSixMonthsFromNow.setDate(dateSixMonthsFromNow.getDate() + 180);

export const courseCard = StrictDict({
  certificate: mkCardSelector(
    cardSimpleSelectors.certificate,
    (certificate) => {
      const availableDate = new Date(certificate.availableDate);
      const isAvailable = availableDate <= new Date();
      return {
        availableDate,
        certPreviewUrl: certificate.certPreviewUrl,
        isDownloadable: certificate.isDownloadable,
        isEarnedButUnavailable: certificate.isEarned && !isAvailable,
        isRestricted: certificate.isRestricted,
      };
    },
  ),
  course: mkCardSelector(
    cardSimpleSelectors.course,
    (course) => ({
      bannerImgSrc: baseAppUrl(course.bannerImgSrc),
      courseNumber: course.courseNumber,
      courseName: course.courseName,
      website: course.website,
    }),
  ),
  courseProvider: mkCardSelector(
    cardSimpleSelectors.courseProvider,
    (courseProvider) => ({ name: courseProvider?.name }),
  ),
  courseRun: mkCardSelector(
    cardSimpleSelectors.courseRun,
    (courseRun) => (courseRun === null ? {} : {
      endDate: new Date(courseRun?.endDate),
      startDate: new Date(courseRun.startDate),

      courseId: courseRun.courseId,
      isArchived: courseRun.isArchived,
      isStarted: courseRun.isStarted,
      isFinished: courseRun.isFinished,

      minPassingGrade: Math.floor(courseRun.minPassingGrade * 100),

      homeUrl: courseRun.homeUrl,
      marketingUrl: courseRun.marketingUrl,
      upgradeUrl: courseRun.upgradeUrl,

      progressUrl: learningMfeUrl(courseRun.progressUrl),
      resumeUrl: learningMfeUrl(courseRun.resumeUrl),
      unenrollUrl: learningMfeUrl(courseRun.unenrollUrl),
    }),
  ),
  enrollment: mkCardSelector(
    cardSimpleSelectors.enrollment,
    (enrollment) => {
      if (enrollment == null) {
        return { isEnrolled: false };
      }
      const { isStaff, hasUnmetPrereqs, isTooEarly } = enrollment.coursewareAccess;
      return {
        coursewareAccess: enrollment.coursewareAccess,
        hasAccess: isStaff || !(hasUnmetPrereqs || isTooEarly),
        isEnrolled: enrollment.isEnrolled,
        lastEnrolled: enrollment.lastEnrolled,
        hasStarted: enrollment.hasStarted,
        hasFinished: enrollment.hasFinished,

        accessExpirationDate: new Date(enrollment.accessExpirationDate),
        canUpgrade: enrollment.canUpgrade,
        isAudit: enrollment.isAudit,
        isAuditAccessExpired: enrollment.isAuditAccessExpired,
        isVerified: enrollment.isVerified,

        isEmailEnabled: enrollment.isEmailEnabled,
      };
    },
  ),
  entitlement: mkCardSelector(
    cardSimpleSelectors.entitlement,
    (entitlement) => {
      if (!entitlement || Object.keys(entitlement).length === 0) {
        return { isEntitlement: false };
      }
      const deadline = new Date(entitlement.changeDeadline);
      const deadlinePassed = deadline < today;
      const showExpirationWarning = !deadlinePassed && deadline <= dateSixMonthsFromNow;
      return {
        isEntitlement: true,

        availableSessions: entitlement.availableSessions,
        changeDeadline: deadline,
        isExpired: entitlement.isExpired,
        isFulfilled: entitlement.isFulfilled,
        uuid: entitlement.uuid,

        hasSessions: entitlement.availableSessions?.length > 0,
        canChange: !deadlinePassed,
        showExpirationWarning,
      };
    },
  ),
  gradeData: mkCardSelector(
    cardSimpleSelectors.gradeData,
    (gradeData) => ({ isPassing: gradeData.isPassing }),
  ),
  relatedPrograms: mkCardSelector(
    cardSimpleSelectors.relatedPrograms,
    (relatedPrograms) => ({
      list: relatedPrograms.map(program => ({
        bannerImgSrc: program.bannerImgSrc,
        logoImgSrc: program.logoImgSrc,
        numberOfCourses: program.numberOfCourses,
        programType: program.programType,
        programUrl: program.programUrl,
        provider: program.provider,
        title: program.title,
      })),
      length: relatedPrograms.length,
    }),
  ),
});

export default courseCard;
