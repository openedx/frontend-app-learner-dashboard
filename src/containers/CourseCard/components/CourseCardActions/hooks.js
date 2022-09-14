import { useDispatch } from 'react-redux';

import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import messages from './messages';

export const useCardActionData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const {
    canUpgrade,
    isAudit,
    isAuditAccessExpired,
    isVerified,
  } = appHooks.useCardEnrollmentData(cardId);
  const { isPending, isArchived } = appHooks.useCardCourseRunData(cardId);
  const {
    isEntitlement,
    canViewCourse,
    isFulfilled,
    isExpired,
    canChange,
    hasSessions,
  } = appHooks.useCardEntitlementData(cardId);
  const openSessionModal = appHooks.useUpdateSelectSessionModalCallback(dispatch, cardId);

  let primary;
  let secondary = null;
  if (isEntitlement) {
    if (!isFulfilled) {
      primary = {
        children: formatMessage(messages.selectSession),
        disabled: !(canChange && hasSessions),
        onClick: openSessionModal,
      };
    } else {
      primary = {
        children: formatMessage(messages.viewCourse),
        disabled: !canViewCourse || isExpired,
      };
    }
  } else {
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
  }
  return { primary, secondary };
};

export default useCardActionData;
