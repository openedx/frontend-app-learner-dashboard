import { selectors } from 'data/redux';

import { useIntl, getCardValues } from 'hooks';

import * as module from './hooks';
import messages from './messages';

const { cardData } = selectors;

export const accessMessage = ({ courseNumber }) => {
  const { formatMessage, formatDate } = useIntl();

  const data = getCardValues(courseNumber, {
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

export const cardHooks = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const data = getCardValues(courseNumber, {
    title: cardData.courseTitle,
    bannerUrl: cardData.courseBannerUrl,
    providerName: cardData.providerName,
  });

  return {
    title: data.title,
    bannerUrl: data.bannerUrl,
    providerName: data.providerName || formatMessage(messages.unknownProviderName),
    accessMessage: module.accessMessage({ courseNumber }),
    formatMessage,
  };
};

export default cardHooks;
