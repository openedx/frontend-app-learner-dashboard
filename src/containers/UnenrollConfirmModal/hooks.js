import React from 'react';

import { StrictDict } from 'utils';
import { thunkActions } from 'data/redux';

import * as module from './hooks';

export const state = StrictDict({
  confirmed: (val) => React.useState(val),
  customReason: (val) => React.useState(val),
  selectedReason: (val) => React.useState(val),
  submittedReason: (val) => React.useState(val),
});

export const modalHooks = ({ closeModal, dispatch }) => {
  const [isConfirmed, setIsConfirmed] = module.state.confirmed(false);
  const [selectedReason, setSelectedReason] = module.state.selectedReason(null);
  const [submittedReason, setSubmittedReason] = module.state.submittedReason(null);
  const [customOption, setCustomOption] = module.state.customReason('');

  const confirm = React.useCallback(() => setIsConfirmed(true), []);

  const close = () => {
    closeModal();
    setIsConfirmed(false);
    setSelectedReason(null);
    setSubmittedReason(null);
    setCustomOption('');
  };

  const reason = {
    value: submittedReason,
    skip: React.useCallback(() => setSubmittedReason('')),
    selectOption: React.useCallback((e) => setSelectedReason(e.target.value), []),
    customOption: {
      value: customOption,
      onChange: React.useCallback((e) => setCustomOption(e.target.value), []),
    },
    selected: selectedReason,
    submit: React.useCallback(() => {
      console.log({ customOption, selectedReason });
      if (selectedReason === 'custom') {
        setSubmittedReason(customOption);
      } else {
        setSubmittedReason(selectedReason);
      }
    }, [customOption, selectedReason]),
    isSubmitted: submittedReason !== null,
  };

  const closeAndRefresh = React.useCallback(() => {
    dispatch(thunkActions.app.refreshList());
    close();
  }, []);

  return {
    isConfirmed,
    confirm,
    reason,
    closeAndRefresh,
    close,
  };
};

export default modalHooks;
