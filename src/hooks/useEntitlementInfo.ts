import { useMemo } from 'react';

const useEntitlementInfo = (courseData) => useMemo(() => {
  const { entitlement } = courseData || {};
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

export default useEntitlementInfo;
