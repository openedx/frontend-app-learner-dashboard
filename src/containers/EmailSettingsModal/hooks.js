import React from 'react';

import { StrictDict } from 'utils';
// import { thunkActions } from 'data/redux';
import { hooks as appHooks } from 'data/redux';

import * as module from './hooks';

export const state = StrictDict({
  toggle: (val) => React.useState(val), // eslint-disable-line
});

export const useEmailData = ({
  closeModal,
  cardId,
  // dispatch,
}) => {
  const { isEmailEnabled } = appHooks.useCardEnrollmentData(cardId);
  const [toggleValue, setToggleValue] = module.state.toggle(isEmailEnabled);
  const onToggle = React.useCallback(
    () => setToggleValue(!toggleValue),
    [setToggleValue, toggleValue],
  );
  const save = React.useCallback(
    () => {
      closeModal();
    },
    [closeModal],
  );

  return {
    onToggle,
    save,
    toggleValue,
  };
};

export default useEmailData;
