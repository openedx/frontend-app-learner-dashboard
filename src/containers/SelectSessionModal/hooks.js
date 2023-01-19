import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { StrictDict } from 'utils';

import track from 'tracking';

import { reduxHooks, apiHooks } from 'hooks';

import { LEAVE_OPTION } from './constants';
import messages from './messages';
import * as module from './hooks';

export const state = StrictDict({
  selectedSession: (val) => React.useState(val), // eslint-disable-line
});

export const useSelectSessionModalData = () => {
  const { formatMessage } = useIntl();

  const selectedCardId = reduxHooks.useSelectSessionModalData().cardId;
  const {
    availableSessions,
    isFulfilled,
  } = reduxHooks.useCardEntitlementData(selectedCardId);
  const { title: courseTitle } = reduxHooks.useCardCourseData(selectedCardId);
  const { courseId } = reduxHooks.useCardCourseRunData(selectedCardId) || {};
  const { isEnrolled } = reduxHooks.useCardEnrollmentData(selectedCardId);
  const leaveEntitlementSession = apiHooks.useLeaveEntitlementSession(selectedCardId);
  const switchEntitlementEnrollment = apiHooks.useSwitchEntitlementEnrollment(selectedCardId);
  const newEntitlementEnrollment = apiHooks.useNewEntitlementEnrollment(selectedCardId);

  const [selectedSession, setSelectedSession] = module.state.selectedSession(courseId || null);

  let header;
  let hint;
  if (isFulfilled) {
    header = formatMessage(messages.changeOrLeaveHeader);
    hint = formatMessage(messages.changeOrLeaveHint);
  } else {
    header = formatMessage(messages.selectSessionHeader, { courseTitle });
    hint = formatMessage(messages.selectSessionHint);
  }
  const closeSessionModal = reduxHooks.useUpdateSelectSessionModalCallback(null);

  const trackNewSession = track.entitlements.newSession(selectedSession);
  const trackSwitchSession = track.entitlements.switchSession(selectedCardId, selectedSession);
  const trackLeaveSession = track.entitlements.leaveSession(selectedCardId);

  const handleSelection = ({ target: { value } }) => setSelectedSession(value);
  const handleSubmit = () => {
    if (selectedSession === LEAVE_OPTION) {
      trackLeaveSession();
      leaveEntitlementSession();
    } else if (isEnrolled) {
      trackSwitchSession();
      switchEntitlementEnrollment(selectedSession);
    } else {
      trackNewSession();
      newEntitlementEnrollment(selectedSession);
    }
    closeSessionModal();
  };

  return {
    showModal: selectedCardId != null,
    closeSessionModal,
    showLeaveOption: isFulfilled,
    availableSessions,
    hint,
    header,
    selectedSession,
    handleSelection,
    handleSubmit,
  };
};

export default useSelectSessionModalData;
