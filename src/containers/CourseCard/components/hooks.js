import { reduxHooks } from 'hooks';
import { EXECUTIVE_EDUCATION_COURSE_MODES } from '../../../data/constants/course';

export const useActionDisabledState = (cardId) => {
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const {
    canUpgrade, hasAccess, isAudit, isAuditAccessExpired, mode,
  } = reduxHooks.useCardEnrollmentData(cardId);
  const {
    isEntitlement, isFulfilled, canChange, hasSessions,
  } = reduxHooks.useCardEntitlementData(cardId);

  const { resumeUrl, homeUrl, upgradeUrl } = reduxHooks.useCardCourseRunData(cardId);

  const disableBeginCourse = !homeUrl || (isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired));
  const disableResumeCourse = !resumeUrl || (isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired));
  const disableViewCourse = !hasAccess || (isAudit && isAuditAccessExpired);
  const disableSelectSession = !isEntitlement || isMasquerading || !hasAccess || (!canChange || !hasSessions);
  const disableUpgradeCourse = !upgradeUrl || (isMasquerading && !canUpgrade);

  const disableCourseTitle = (isEntitlement && !isFulfilled) || disableViewCourse;

  const isExecutiveEd2uCourse = (EXECUTIVE_EDUCATION_COURSE_MODES.includes(mode));

  return {
    disableBeginCourse,
    disableResumeCourse,
    disableViewCourse,
    disableUpgradeCourse,
    disableSelectSession,
    disableCourseTitle,
    isExecutiveEd2uCourse,
  };
};

export default useActionDisabledState;
