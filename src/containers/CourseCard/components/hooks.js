import { reduxHooks } from 'hooks';

export const useActionDisabledState = (cardId) => {
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const {
    hasAccess, isAudit, isAuditAccessExpired,
  } = reduxHooks.useCardEnrollmentData(cardId);
  const {
    isEntitlement, isFulfilled, canChange, hasSessions,
  } = reduxHooks.useCardEntitlementData(cardId);

  const { resumeUrl, homeUrl } = reduxHooks.useCardCourseRunData(cardId);

  const disableBeginCourse = !homeUrl || (isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired));
  const disableResumeCourse = !resumeUrl || (isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired));
  const disableViewCourse = !hasAccess || (isAudit && isAuditAccessExpired);
  const disableSelectSession = !isEntitlement || isMasquerading || !hasAccess || (!canChange || !hasSessions);

  const disableCourseTitle = (isEntitlement && !isFulfilled) || disableViewCourse;

  return {
    disableBeginCourse,
    disableResumeCourse,
    disableViewCourse,
    disableSelectSession,
    disableCourseTitle,
  };
};

export default useActionDisabledState;
