import React from 'react';
import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { StrictDict } from 'utils';

import track from 'tracking';
import { hooks as appHooks, thunkActions } from 'data/redux';
import * as module from './hooks';
import { LEAVE_OPTION } from './constants';
import messages from './messages';

export const state = StrictDict({
  selectedSession: (val) => React.useState(val), // eslint-disable-line
});

export const useSelectSessionModalData = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const selectedCardId = appHooks.useSelectSessionModalData().cardId;
  const {
    availableSessions,
    isFulfilled,
  } = appHooks.useCardEntitlementData(selectedCardId);
  const { title: courseTitle } = appHooks.useCardCourseData(selectedCardId);
  const { courseId } = appHooks.useCardCourseRunData(selectedCardId) || {};
  const { isEnrolled } = appHooks.useCardEnrollmentData(selectedCardId);

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
  const updateCardIdCallback = appHooks.useUpdateSelectSessionModalCallback;
  const closeSessionModal = updateCardIdCallback(null);

  const trackNewSession = track.entitlements.newSession(selectedSession);
  const trackSwitchSession = track.entitlements.switchSession(selectedCardId, selectedSession);
  const trackLeaveSession = track.entitlements.leaveSession(selectedCardId);

  const handleSelection = ({ target: { value } }) => setSelectedSession(value);
  const handleSubmit = () => {
    if (selectedSession === LEAVE_OPTION) {
      trackLeaveSession();
      dispatch(thunkActions.app.leaveEntitlementSession(selectedCardId));
    } else if (isEnrolled) {
      trackSwitchSession();
      dispatch(thunkActions.app.switchEntitlementEnrollment(selectedCardId, selectedSession));
    } else {
      trackNewSession();
      dispatch(thunkActions.app.newEntitlementEnrollment(selectedCardId, selectedSession));
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
