import { useIntl } from '@edx/frontend-platform/i18n';
import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';
import messages from './messages';

export const useAccessMessage = ({ cardId }) => {
  const { formatMessage, formatDate } = useIntl();
  const enrollment = appHooks.useCardEnrollmentData(cardId);
  const courseRun = appHooks.useCardCourseRunData(cardId);
  if (!courseRun.isStarted) {
    const startDate = formatDate(courseRun.startDate);
    return formatMessage(messages.courseStarts, { startDate });
  }
  if (enrollment.isEnrolled) {
    if (enrollment.isAudit) {
      const {
        accessExpirationDate,
        isAuditAccessExpired,
      } = enrollment;
      return formatMessage(
        isAuditAccessExpired ? messages.accessExpired : messages.accessExpires,
        { accessExpirationDate: formatDate(accessExpirationDate) },
      );
    }
    const { isArchived, endDate } = courseRun;
    return formatMessage(
      isArchived ? messages.courseEnded : messages.courseEnds,
      { endDate: formatDate(endDate) },
    );
  }
  return null;
};

export const useCardDetailsData = ({ dispatch, cardId }) => {
  const { formatMessage } = useIntl();
  const providerName = appHooks.useCardProviderData(cardId).name;
  const { courseNumber } = appHooks.useCardCourseData(cardId);
  const {
    isEntitlement,
    isFulfilled,
    canChange,
  } = appHooks.useCardEntitlementData(cardId);

  const openSessionModal = appHooks.useUpdateSelectSessionModalCallback(dispatch, cardId);

  return {
    providerName: providerName || formatMessage(messages.unknownProviderName),
    accessMessage: hooks.useAccessMessage({ cardId }),
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    formatMessage,
    courseNumber,
  };
};

export default useCardDetailsData;
