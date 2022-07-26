import { useIntl } from '@edx/frontend-platform/i18n';
import { hooks as appHooks } from 'data/redux';
import useSelectSession from 'containers/SelectSession/hooks';

import * as module from './hooks';
import messages from './messages';

export const useAccessMessage = ({ courseNumber }) => {
  const { formatMessage, formatDate } = useIntl();
  const {
    accessExpirationDate,
    isAudit,
    isAuditAccessExpired,
  } = appHooks.useCardEnrollmentData(courseNumber);
  const { isArchived, endDate } = appHooks.useCardCourseRunData(courseNumber);

  if (isAudit) {
    return formatMessage(
      isAuditAccessExpired ? messages.accessExpired : messages.accessExpires,
      { accessExpirationDate: formatDate(accessExpirationDate) },
    );
  }

  return formatMessage(
    isArchived ? messages.courseEnded : messages.courseEnds,
    { endDate: formatDate(endDate) },
  );
};

export const useCardDetailsData = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const providerName = appHooks.useCardProviderData(courseNumber).name;
  const {
    isEntitlement,
    isFulfilled,
    canChange,
  } = appHooks.useCardEntitlementsData(courseNumber);

  const { openSessionModalWithLeaveOption: openSessionModal } = useSelectSession({ courseNumber });

  return {
    providerName: providerName || formatMessage(messages.unknownProviderName),
    accessMessage: module.useAccessMessage({ courseNumber }),
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    formatMessage,
  };
};

export default useCardDetailsData;
