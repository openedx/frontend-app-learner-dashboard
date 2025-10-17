import { reduxHooks } from 'hooks';

export const useActionDisabledState = (cardId) => {
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const {
    hasAccess, isAudit, isAuditAccessExpired, coursewareAccess,
  } = reduxHooks.useCardEnrollmentData(cardId);

  const {
    isEntitlement, isFulfilled, canChange, hasSessions,
  } = reduxHooks.useCardEntitlementData(cardId);

  const { resumeUrl, homeUrl } = reduxHooks.useCardCourseRunData(cardId);

  const blockedByPrereqs = Boolean(coursewareAccess?.hasUnmetPrerequisites);

  const disableBeginCourse = !homeUrl
    || isMasquerading
    || !hasAccess
    || (isAudit && isAuditAccessExpired)
    || blockedByPrereqs;

  const disableResumeCourse = !resumeUrl
    || (isMasquerading
    || !hasAccess
    || (isAudit && isAuditAccessExpired))
    || blockedByPrereqs;

  const disableViewCourse = !hasAccess || (isAudit && isAuditAccessExpired) || blockedByPrereqs;

  const disableSelectSession = !isEntitlement
    || isMasquerading
    || !hasAccess
    || (!canChange || !hasSessions)
    || blockedByPrereqs;

  const disableCourseTitle = (isEntitlement && !isFulfilled) || disableViewCourse;

  return {
    disableBeginCourse,
    disableResumeCourse,
    disableViewCourse,
    disableSelectSession,
    disableCourseTitle,
    blockedByPrereqs,
  };
};

export default useActionDisabledState;
