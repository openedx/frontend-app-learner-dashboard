import React from 'react';

import { StrictDict } from 'utils';
import { thunkActions } from 'data/redux';

import * as module from './hooks';

export const state = StrictDict({
  confirmed: (val) => React.useState(val),
  customOption: (val) => React.useState(val),
  isSkipped: (val) => React.useState(val),
  selectedReason: (val) => React.useState(val),
  submittedReason: (val) => React.useState(val),
});

export const modalStates = StrictDict({
  confirm: 'confirm',
  reason: 'reason',
  finished: 'finished',
});

export const valueCallback = (cb, prereqs = []) => (
  React.useCallback(e => cb(e.target.value), prereqs)
);

export const unenrollReasons = () => {
  const [selectedReason, setSelectedReason] = module.state.selectedReason(null);
  const [submittedReason, setSubmittedReason] = module.state.submittedReason(null);
  const [isSkipped, setIsSkipped] = module.state.isSkipped(false);
  const [customOption, setCustomOption] = module.state.customOption('');

  return {
    clear: React.useCallback(() => {
      setSelectedReason(null);
      setSubmittedReason(null);
      setCustomOption('');
      setIsSkipped(false);
    }, []),

    value: submittedReason,

    customOption: {
      value: customOption,
      onChange: module.valueCallback(setCustomOption),
    },

    selected: selectedReason,
    selectOption: module.valueCallback(setSelectedReason),

    isSkipped,
    skip: React.useCallback(() => setIsSkipped(true), [isSkipped]),

    isSubmitted: submittedReason !== null || isSkipped,
    submit: React.useCallback(() => {
      if (selectedReason === 'custom') {
        setSubmittedReason(customOption);
      } else {
        setSubmittedReason(selectedReason);
      }
    }, [customOption, selectedReason]),
  };
};

export const modalHooks = ({ closeModal, dispatch }) => {
  const [isConfirmed, setIsConfirmed] = module.state.confirmed(false);

  const confirm = React.useCallback(() => setIsConfirmed(true), []);

  const reason = module.unenrollReasons();
  const close = () => {
    closeModal();
    setIsConfirmed(false);
    reason.clear();
  };

  let modalState;
  if (isConfirmed) {
    modalState = reason.isSubmitted ? modalStates.finished : modalStates.reason;
  } else {
    modalState = modalStates.confirm;
  }

  const closeAndRefresh = React.useCallback(() => {
    dispatch(thunkActions.app.refreshList());
    close();
  }, [reason, isConfirmed]);

  return {
    isConfirmed,
    confirm,
    reason,
    close: React.useCallback(close, [reason, isConfirmed]),
    closeAndRefresh,
    modalState,
  };
};

export default modalHooks;
