import { useMemo } from 'react';
import { useCourseData } from 'hooks';
import { useIsMasquerading } from 'hooks/useIsMasquerading';

const useEntitlementInfo = (courseData) => useMemo(() => {
  const { entitlement } = courseData;
  if (!entitlement || Object.keys(entitlement).length === 0 || entitlement.isEntitlement === false) {
    return { isEntitlement: false };
  }
  const today = new Date();
  const dateSixMonthsFromNow = new Date();
  dateSixMonthsFromNow.setDate(dateSixMonthsFromNow.getDate() + 180);
  const deadline = new Date(entitlement.changeDeadline);
  const deadlinePassed = deadline < today;
  const showExpirationWarning = (
    !entitlement.isFulfilled
        && !deadlinePassed
        && deadline <= dateSixMonthsFromNow
  );
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
}, [courseData]);

export const useActionDisabledState = (cardId) => {
  const courseData = useCourseData(cardId);
  const isMasquerading = useIsMasquerading();

  const {
    isAudit, isAuditAccessExpired,
  } = courseData.enrollment || {};
  const { isStaff, hasUnmetPrereqs, isTooEarly } = courseData.enrollment?.coursewareAccess || {};
  const hasAccess = isStaff || !(hasUnmetPrereqs || isTooEarly);
  const {
    isEntitlement, isFulfilled, canChange, hasSessions,
  } = useEntitlementInfo(courseData);

  const { resumeUrl, homeUrl } = courseData.courseRun || {};
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
export { useEntitlementInfo };
