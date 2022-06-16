import React from 'react';

import { StrictDict } from 'utils';
// import { thunkActions } from 'data/redux';
import { selectors } from 'data/redux';
import { useCardValues } from 'hooks';

import * as module from './hooks';

const { cardData } = selectors;

export const state = StrictDict({
  toggle: (val) => React.useState(val), // eslint-disable-line
});

export const useEmailData = ({
  closeModal,
  courseNumber,
  // dispatch,
}) => {
  const data = useCardValues(courseNumber, {
    isEnabled: cardData.isEmailEnabled,
  });
  const [toggleValue, setToggleValue] = module.state.toggle(data.isEnabled);
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
