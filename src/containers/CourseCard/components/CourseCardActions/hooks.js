import { Locked } from '@edx/paragon/icons';

import { selectors } from 'data/redux';
import { useIntl, useCardValues } from 'hooks';
import messages from './messages';

const { cardData } = selectors;

export const useCardActionData = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const data = useCardValues(courseNumber, {
    canUpgrade: cardData.canUpgrade,
    isAudit: cardData.isAudit,
    isAuditAccessExpired: cardData.isAuditAccessExpired,
    isVerified: cardData.isVerified,
    isPending: cardData.isCourseRunPending,
    isFinished: cardData.isCourseRunFinished,
  });
  let primary;
  let secondary = null;
  if (!data.isVerified) {
    secondary = {
      iconBefore: Locked,
      variant: 'outline-primary',
      disabled: !data.canUpgrade,
      children: formatMessage(messages.upgrade),
    };
  }
  if (data.isPending) {
    primary = { children: formatMessage(messages.beginCourse) };
  } else if (!data.isFinished) {
    primary = {
      children: formatMessage(messages.resume),
      disabled: data.isAudit && data.isAuditAccessExpired,
    };
  } else {
    primary = { children: formatMessage(messages.viewCourse) };
  }
  return { primary, secondary };
};

export default useCardActionData;
