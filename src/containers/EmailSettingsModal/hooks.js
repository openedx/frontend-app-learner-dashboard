import React from 'react';

import { StrictDict } from 'utils';
import { hooks as appHooks, thunkActions } from 'data/redux';

import * as module from './hooks';

export const state = StrictDict({
  toggle: (val) => React.useState(val), // eslint-disable-line
});

export const useEmailData = ({
  closeModal,
  cardId,
  dispatch,
}) => {
  const { hasOptedOutOfEmail } = appHooks.useCardEnrollmentData(cardId);
  const [isOptedOut, setIsOptedOut] = module.state.toggle(hasOptedOutOfEmail);
  const onToggle = React.useCallback(
    () => setIsOptedOut(!isOptedOut),
    [setIsOptedOut, isOptedOut],
  );
  const save = React.useCallback(
    () => {
      dispatch(thunkActions.app.updateEmailSettings(cardId, isOptedOut));
      closeModal();
    },
    [cardId, closeModal, dispatch, isOptedOut],
  );

  return {
    onToggle,
    save,
    isOptedOut,
  };
};

export default useEmailData;
