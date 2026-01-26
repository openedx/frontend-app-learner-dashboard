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

  const isStaff = Boolean(coursewareAccess?.isStaff) || false;
  const blockedByPrereqs = Boolean(coursewareAccess?.hasUnmetPrerequisites);

  const disableBeginCourse = !isStaff && (
    !homeUrl
    || isMasquerading
    || !hasAccess
    || (isAudit && isAuditAccessExpired)
    || blockedByPrereqs
  );

  const disableResumeCourse = !isStaff && (
    !resumeUrl
    || (isMasquerading
    || !hasAccess
    || (isAudit && isAuditAccessExpired))
    || blockedByPrereqs
  );

  const disableViewCourse = !isStaff && (
    !hasAccess
    || (isAudit && isAuditAccessExpired)
    || blockedByPrereqs
  );

  const disableSelectSession = !isStaff && (
    !isEntitlement
    || isMasquerading
    || !hasAccess
    || (!canChange || !hasSessions)
    || blockedByPrereqs
  );

  const disableCourseTitle = !isStaff && (
    (isEntitlement && !isFulfilled)
    || disableViewCourse
  );

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
