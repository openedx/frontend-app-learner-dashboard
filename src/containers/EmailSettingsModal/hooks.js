import React from 'react';

import { StrictDict } from 'utils';
// import { thunkActions } from 'data/redux';
import { selectors } from 'data/redux';
import { getCardValue } from 'hooks';

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
  const cardValue = getCardValue(courseNumber);
  const isEmailEnabled = cardValue(cardData.isEmailEnabled);
  const [toggleValue, setToggleValue] = module.state.toggle(isEmailEnabled);

  const onToggle = React.useCallback(() => setToggleValue(!toggleValue), [toggleValue]);
  const save = React.useCallback(
    () => {
      console.log('save email settings');
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
