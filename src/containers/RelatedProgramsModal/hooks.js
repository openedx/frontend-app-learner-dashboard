import React from 'react';

import { StrictDict } from 'utils';
import { thunkActions } from 'data/redux';

import * as module from './hooks';

export const state = StrictDict({
  toggle: (val) => React.useState(val),
});

export const modalHooks = ({
  cardData,
  closeModal,
  // dispatch,
}) => {
  const { isEmailEnabled } = cardData.enrollment;
  const [toggleValue, setToggleValue] = module.state.toggle(isEmailEnabled);

  const onToggle = React.useCallback(() => setToggleValue(!toggleValue), [toggleValue]);
  const save = React.useCallback(
    () => {
      console.log("save email settings");
      closeModal();
    },
    [],
  );

  return {
    onToggle,
    save,
    toggleValue,
  };
};

export default modalHooks;
