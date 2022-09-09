import React from 'react';
import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { StrictDict } from 'utils';

import { hooks as appHooks, thunkActions } from 'data/redux';
import * as module from './hooks';
import { LEAVE_OPTION } from './constants';
import messages from './messages';

export const state = StrictDict({
  selectedSession: (val) => React.useState(val), // eslint-disable-line
});

export const useSelectSessionModalData = () => {
  const dispatch = useDispatch();
  const selectedCardId = appHooks.useSelectSessionModalData().cardId;
  const {
    entitlementessions,
    isFulfilled,
    uuid,
  } = appHooks.useCardEntitlementData(selectedCardId);
  const { title: courseTitle } = appHooks.useCardCourseData(selectedCardId);
  const { formatMessage } = useIntl();
  const [selectedSession, setSelectedSession] = module.state.selectedSession(null);

  let header;
  let hint;
  if (isFulfilled) {
    header = formatMessage(messages.changeOrLeaveHeader);
    hint = formatMessage(messages.changeOrLeaveHint);
  } else {
    header = formatMessage(messages.selectSessionHeader, {
      courseTitle,
    });
    hint = formatMessage(messages.selectSessionHint);
  }
  const updateCallback = appHooks.useUpdateSelectSessionModalCallback;

  const handleSelection = ({ target: { value } }) => setSelectedSession(value);
  const handleSubmit = () => {
    if (selectedSession === LEAVE_OPTION) {
      return dispatch(thunkActions.requests.leaveEntitlementSession({ uuid }));
    }
    return dispatch(thunkActions.requests.updateEntitlementEnrollment({ uuid, courseId: selectedSession }));
  };

  return {
    showModal: selectedCardId != null,
    closeSessionModal: updateCallback(dispatch, null),
    openSessionModal: (cardId) => updateCallback(dispatch, cardId),
    showLeaveOption: isFulfilled,
    entitlementessions,
    hint,
    header,
    selectedSession,
    handleSelection,
    handleSubmit,
  };
};

export default useSelectSessionModalData;
