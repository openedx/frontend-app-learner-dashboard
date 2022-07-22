import { useIntl } from '@edx/frontend-platform/i18n';
import { hooks as appHooks } from 'data/redux';

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

export const useCardData = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const { title, bannerUrl } = appHooks.useCardCourseData(courseNumber);
  const providerName = appHooks.useCardProviderData(courseNumber).name;

  return {
    title,
    bannerUrl,
    providerName: providerName || formatMessage(messages.unknownProviderName),
    accessMessage: module.useAccessMessage({ courseNumber }),
    formatMessage,
  };
};

export default useCardData;
