import React from 'react';

import { thunkActions } from 'data/redux';
import { useValueCallback } from 'hooks';
import { StrictDict } from 'utils';

import * as module from './reasons';

export const state = StrictDict({
  customOption: (val) => React.useState(val), // eslint-disable-line
  isSkipped: (val) => React.useState(val), // eslint-disable-line
  selectedReason: (val) => React.useState(val), // eslint-disable-line
});

export const useUnenrollReasons = ({
  dispatch,
  cardId,
}) => {
  const [selectedReason, setSelectedReason] = module.state.selectedReason(null);
  const [isSkipped, setIsSkipped] = module.state.isSkipped(false);
  const [customOption, setCustomOption] = module.state.customOption('');
  const submittedReason = selectedReason === 'custom' ? customOption : selectedReason;

  const clear = () => {
    setSelectedReason(null);
    setCustomOption('');
    setIsSkipped(false);
  };
  const skip = () => {
    setIsSkipped(true);
    dispatch(thunkActions.app.unenrollFromCourse(cardId));
  };

  return {
    clear,
    customOption: { value: customOption, onChange: useValueCallback(setCustomOption) },
    selectOption: useValueCallback(setSelectedReason),
    isSkipped,
    skip,
    isSubmitted: isSkipped || selectedReason !== null,
    submittedReason,
  };
};
