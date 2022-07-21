import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import messages from './messages';

export const useCardActionData = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const {
    canUpgrade,
    isAudit,
    isAuditAccessExpired,
    isVerified,
  } = appHooks.useCardEnrollmentData(courseNumber);
  const { isPending, isArchived } = appHooks.useCardCourseRunData(courseNumber);

  let primary;
  let secondary = null;
  if (!isVerified) {
    secondary = {
      iconBefore: Locked,
      variant: 'outline-primary',
      disabled: !canUpgrade,
      children: formatMessage(messages.upgrade),
    };
  }
  if (isPending) {
    primary = { children: formatMessage(messages.beginCourse) };
  } else if (!isArchived) {
    primary = {
      children: formatMessage(messages.resume),
      disabled: isAudit && isAuditAccessExpired,
    };
  } else {
    primary = { children: formatMessage(messages.viewCourse) };
  }
  return { primary, secondary };
};

export default useCardActionData;
