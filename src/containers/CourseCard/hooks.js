import { useIntl } from '@edx/frontend-platform/i18n';
import { selectors } from 'data/redux';

import { useCardValues } from 'hooks';

import * as module from './hooks';
import messages from './messages';

const { cardData } = selectors;

export const useAccessMessage = ({ courseNumber }) => {
  const { formatMessage, formatDate } = useIntl();

  const data = useCardValues(courseNumber, {
    accessExpirationDate: cardData.courseRunAccessExpirationDate,
    isAudit: cardData.isAudit,
    isFinished: cardData.isCourseRunFinished,
    isAuditAccessExpired: cardData.isAuditAccessExpired,
    endDate: cardData.courseRunEndDate,
  });
  if (data.isAudit) {
    return formatMessage(
      data.isAuditAccessExpired ? messages.accessExpired : messages.accessExpires,
      { accessExpirationDate: formatDate(data.accessExpirationDate) },
    );
  }
  return formatMessage(
    data.isFinished ? messages.courseEnded : messages.courseEnds,
    { endDate: formatDate(data.endDate) },
  );
};

export const useCardData = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const data = useCardValues(courseNumber, {
    title: cardData.courseTitle,
    bannerUrl: cardData.courseBannerUrl,
    providerName: cardData.providerName,
  });

  return {
    title: data.title,
    bannerUrl: data.bannerUrl,
    providerName: data.providerName || formatMessage(messages.unknownProviderName),
    accessMessage: module.useAccessMessage({ courseNumber }),
    formatMessage,
  };
};

export default useCardData;
