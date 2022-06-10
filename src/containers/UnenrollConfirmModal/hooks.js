import React from 'react';

import { StrictDict } from 'utils';
import { thunkActions } from 'data/redux';

import * as module from './hooks';

export const state = StrictDict({
  confirmed: (val) => React.useState(val),
  customReason: (val) => React.useState(val),
  isSkipped: (val) => React.useState(val),
  selectedReason: (val) => React.useState(val),
  submittedReason: (val) => React.useState(val),
});

export const modalStates = StrictDict({
  confirm: 'confirm',
  reason: 'reason',
  finished: 'finished',
});

export const unenrollReasons = () => {
  const [selectedReason, setSelectedReason] = module.state.selectedReason(null);
  const [submittedReason, setSubmittedReason] = module.state.submittedReason(null);
  const [isSkipped, setIsSkipped] = module.state.isSkipped(false);
  const [customOption, setCustomOption] = module.state.customReason('');

  return {
    clear: React.useCallback(() => {
      setSelectedReason(null);
      setSubmittedReason(null);
      setCustomOption('');
      setIsSkipped(false);
    }, []),
    customOption: {
      value: customOption,
      onChange: React.useCallback((e) => setCustomOption(e.target.value), []),
    },
    isSkipped,
    isSubmitted: submittedReason !== null || isSkipped,
    selected: selectedReason,
    selectOption: React.useCallback((e) => setSelectedReason(e.target.value), []),
    skip: React.useCallback(() => setIsSkipped(true), [isSkipped]),
    submit: React.useCallback(() => {
      if (selectedReason === 'custom') {
        setSubmittedReason(customOption);
      } else {
        setSubmittedReason(selectedReason);
      }
    }, [customOption, selectedReason]),
    value: submittedReason,
  };
};

export const modalHooks = ({ closeModal, dispatch }) => {
  const [isConfirmed, setIsConfirmed] = module.state.confirmed(false);

  const confirm = React.useCallback(() => setIsConfirmed(true), []);

  const reason = unenrollReasons();
  const close = () => {
    closeModal();
    setIsConfirmed(false);
    reason.clear();
  };

  let modalState;
  if (isConfirmed) {
    modalState = reason.isSubmitted ? modalStates.finished : modalState.reason;
  } else {
    modalState = modalStates.confirm;
  }

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
    modalState,
  };
};

export default modalHooks;
