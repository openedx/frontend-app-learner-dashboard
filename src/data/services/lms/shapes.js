import PropTypes from 'prop-types';
import { StrictDict, keyStore } from 'utils';

export const shapes = StrictDict({
  course: PropTypes.shape({
    bannerUrl: PropTypes.string,
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
  certificates: PropTypes.shape({
    availableDate: PropTypes.string,
    downloadUrls: PropTypes.shape({
      preview: PropTypes.string,
      download: PropTypes.string,
    }),
    isAvailable: PropTypes.bool,
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
  grades: PropTypes.shape({
    isPassing: PropTypes.bool,
  }),
  programCard: PropTypes.shape({
    provider: PropTypes.string,
    bannerUrl: PropTypes.string,
    logoUrl: PropTypes.string,
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
  certificates: shapes.certificates,
  enrollment: shapes.enrollment,
  entitlement: shapes.entitlement,
  grades: shapes.grades,
  relatedPrograms: PropTypes.arrayOf(shapes.programCard),
});

export const keys = StrictDict({
  cardData: keyStore(shapes.courseRunCardData),
  course: keyStore(shapes.course),
  provider: keyStore(shapes.provider),
  courseRun: keyStore(shapes.courseRun),
  certificates: keyStore(shapes.certificates),
  enrollment: keyStore(shapes.enrollment),
  entitlement: keyStore(shapes.entitlement),
  grades: keyStore(shapes.grades),
  program: keyStore(shapes.programCard),
});

export default shapes;
