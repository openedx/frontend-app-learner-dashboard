import { useIntl } from '@edx/frontend-platform/i18n';
import { utilHooks, reduxHooks } from 'hooks';

import * as hooks from './hooks';
import messages from './messages';

export const useAccessMessage = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const enrollment = reduxHooks.useCardEnrollmentData(cardId);
  const courseRun = reduxHooks.useCardCourseRunData(cardId);
  const formatDate = utilHooks.useFormatDate();
  if (!courseRun.isStarted) {
    if (!courseRun.startDate) { return null; }
    const startDate = formatDate(courseRun.startDate);
    return formatMessage(messages.courseStarts, { startDate });
  }
  if (enrollment.isEnrolled) {
    const { isArchived, endDate } = courseRun;
    const {
      accessExpirationDate,
      isAuditAccessExpired,
    } = enrollment;

    if (enrollment.isAudit && accessExpirationDate) {
      return formatMessage(
        isAuditAccessExpired ? messages.accessExpired : messages.accessExpires,
        { accessExpirationDate: formatDate(accessExpirationDate) },
      );
    }
    if (!endDate) { return null; }
    return formatMessage(
      isArchived ? messages.courseEnded : messages.courseEnds,
      { endDate: formatDate(endDate) },
    );
  }
  return null;
};

export const useCardDetailsData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const providerName = reduxHooks.useCardProviderData(cardId).name;
  const { courseNumber } = reduxHooks.useCardCourseData(cardId);
  const {
    isEntitlement,
    isFulfilled,
    canChange,
  } = reduxHooks.useCardEntitlementData(cardId);

  const openSessionModal = reduxHooks.useUpdateSelectSessionModalCallback(cardId);

  return {
    providerName: providerName || formatMessage(messages.unknownProviderName),
    accessMessage: hooks.useAccessMessage({ cardId }),
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    courseNumber,
    changeOrLeaveSessionMessage: formatMessage(messages.changeOrLeaveSessionButton),
  };
};

export default useCardDetailsData;
