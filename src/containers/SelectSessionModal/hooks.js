import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';

import messages from './messages';

export const useSelectSessionModalData = () => {
  const dispatch = useDispatch();
  const selectedCardId = appHooks.useSelectSessionModalData().cardId;

  const {
    entitlementSessions,
    isFulfilled,
  } = appHooks.useCardEntitlementsData(selectedCardId);

  const { title: courseTitle } = appHooks.useCardCourseData(selectedCardId);

  const { formatMessage } = useIntl();

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

  return {
    showModal: selectedCardId != null,
    closeSessionModal: updateCallback(dispatch, null),
    openSessionModal: (cardId) => updateCallback(dispatch, cardId),
    showLeaveOption: isFulfilled,
    entitlementSessions,
    hint,
    header,
  };
};

export default useSelectSessionModalData;
