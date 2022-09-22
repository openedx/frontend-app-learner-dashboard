import PropTypes from 'prop-types';
import { StrictDict, keyStore } from 'utils';

export const shapes = StrictDict({
  course: PropTypes.shape({
    bannerImgSrc: PropTypes.string,
    title: PropTypes.string,
    website: PropTypes.string,
  }),
  provider: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    website: PropTypes.string,
  }),
  courseRun: PropTypes.shape({
    accessExpirationDate: PropTypes.string,
    cardId: PropTypes.string,
    isArchived: PropTypes.bool,
    isFinished: PropTypes.bool,
    isPending: PropTypes.bool,
    isStarted: PropTypes.bool,
    minPassingGrade: PropTypes.number,
  }),
  certificate: PropTypes.shape({
    availableDate: PropTypes.string,
    downloadUrls: PropTypes.shape({
      preview: PropTypes.string,
      download: PropTypes.string,
    }),
    isDownloadable: PropTypes.bool,
    isEarned: PropTypes.bool,
    isRestricted: PropTypes.bool,
  }),
  enrollment: PropTypes.shape({
    canUpgrade: PropTypes.bool,
    isAudit: PropTypes.bool,
    isAuditAccessExpired: PropTypes.bol,
    isVerified: PropTypes.bool,
  }),
  entitlement: PropTypes.shape({
    isEntitlement: PropTypes.bool.isRequired,
    availableSessions: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      cardId: PropTypes.string,
    }),
    canChange: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    isRefundable: PropTypes.bool,
    changeDeadline: PropTypes.string,
    isExpired: PropTypes.bool,
    canViewCourse: PropTypes.bool,
  }),
  gradeData: PropTypes.shape({
    isPassing: PropTypes.bool,
  }),
  programCard: PropTypes.shape({
    provider: PropTypes.string,
    bannerImgSrc: PropTypes.string,
    logoImgSrc: PropTypes.string,
    title: PropTypes.string,
    programUrl: PropTypes.string,
    programType: PropTypes.string,
    programTypeUrl: PropTypes.string,
    numberOfCourses: PropTypes.number,
    estimatedNumberOfWeeks: PropTypes.number,
  }),
});

shapes.courseRunCardData = PropTypes.shape({
  course: shapes.course,
  provider: shapes.provider,
  courseRun: shapes.courseRun,
  certificate: shapes.certificate,
  enrollment: shapes.enrollment,
  entitlement: shapes.entitlement,
  gradeData: shapes.gradeData,
  relatedPrograms: PropTypes.arrayOf(shapes.programCard),
});

export const keys = StrictDict({
  cardData: keyStore(shapes.courseRunCardData),
  course: keyStore(shapes.course),
  provider: keyStore(shapes.provider),
  courseRun: keyStore(shapes.courseRun),
  certificate: keyStore(shapes.certificate),
  enrollment: keyStore(shapes.enrollment),
  entitlement: keyStore(shapes.entitlement),
  gradeData: keyStore(shapes.gradeData),
  program: keyStore(shapes.programCard),
});

export default shapes;
