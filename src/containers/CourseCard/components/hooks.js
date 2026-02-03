import { useCourseData, useEntitlementInfo } from 'hooks';
import { useIsMasquerading } from 'hooks/useIsMasquerading';

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
