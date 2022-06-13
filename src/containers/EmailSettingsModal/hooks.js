import React from 'react';

import { StrictDict } from 'utils';
// import { thunkActions } from 'data/redux';
import { selectors } from 'data/redux';
import { getCardValues } from 'hooks';

import * as module from './hooks';

const { cardData } = selectors;

export const state = StrictDict({
  toggle: (val) => React.useState(val),
});

export const modalHooks = ({
  closeModal,
  courseNumber,
  // dispatch,
}) => {
  const data = getCardValues(courseNumber, {
    isEnabled: cardData.isEmailEnabled,
  });
  const [toggleValue, setToggleValue] = module.state.toggle(data.isEnabled);
  const onToggle = React.useCallback(() => setToggleValue(!toggleValue), [toggleValue]);
  const save = React.useCallback(
    () => {
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
