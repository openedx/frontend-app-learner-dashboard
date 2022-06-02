import PropTypes from 'prop-types';
import { StrictDict } from 'utils';

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
    courseNumber: PropTypes.string,
    isArchived: PropTypes.bool,
    isFinished: PropTypes.bool,
    isPending: PropTypes.bool,
    isStarted: PropTypes.bool,
    minPassingGrade: PropTypes.number,
  }),
  credit: PropTypes.shape({
    isPurchased: PropTypes.bool,
    requestStatus: PropTypes.string,
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
    isEntitlement: PropTypes.bool,
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
});

shapes.courseRunCardData = PropTypes.shape({
  course: shapes.course,
  provider: shapes.provider,
  courseRun: shapes.courseRun,
  credit: shapes.credit,
  certificates: shapes.certificates,
  enrollment: shapes.enrollment,
  entitlement: shapes.entitlement,
  grades: shapes.grades,
});

export default shapes;
