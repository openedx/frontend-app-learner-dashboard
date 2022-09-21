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
    coursewareAccess,
    hasStarted,
    isAudit,
    isAuditAccessExpired,
    isVerified,
  } = appHooks.useCardEnrollmentData(cardId);
  const { isArchived } = appHooks.useCardCourseRunData(cardId);
  const {
    canChange,
    hasSessions,
    isEntitlement,
    isExpired,
    isFulfilled,
  } = appHooks.useCardEntitlementData(cardId);
  const openSessionModal = appHooks.useUpdateSelectSessionModalCallback(dispatch, cardId);

  const hasAccess = coursewareAccess.isStaff || !(
    coursewareAccess.hasUnmetPrereqs
    || coursewareAccess.isTooEarly
    || isArchived);

  const selectSessionButton = {
    children: formatMessage(messages.selectSession),
    onClick: openSessionModal,
    disabled: !hasAccess || (!canChange || !hasSessions),
  };

  const viewCourseButton = {
    children: formatMessage(messages.viewCourse),
    disabled: !hasAccess || (isEntitlement && isExpired),
  };

  const beginCourseButton = {
    children: formatMessage(messages.beginCourse),
    disabled: !hasAccess,
  };

  const resumeButton = {
    children: formatMessage(messages.resume),
    disabled: isAudit && isAuditAccessExpired,
  };

  const upgradeButton = {
    iconBefore: Locked,
    variant: 'outline-primary',
    children: formatMessage(messages.upgrade),
    disabled: !canUpgrade,
  };

  let primary;
  if (isEntitlement) {
    primary = isFulfilled ? selectSessionButton : viewCourseButton;
  } else if (!hasStarted) {
    primary = beginCourseButton;
  } else if (isArchived) {
    primary = viewCourseButton;
  } else {
    primary = resumeButton;
  }

  const secondary = (isEntitlement || !isVerified) ? null : upgradeButton;
  return { primary, secondary };
};

export default useCardActionData;
