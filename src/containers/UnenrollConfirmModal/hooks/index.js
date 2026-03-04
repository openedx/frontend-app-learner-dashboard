import React from 'react';

import { StrictDict } from '@src/utils';

import { useUnenrollReasons } from './reasons';
import * as module from '.';

export const state = StrictDict({
  confirmed: (val) => React.useState(val), // eslint-disable-line
});

export const modalStates = StrictDict({
  confirm: 'confirm',
  reason: 'reason',
  finished: 'finished',
});

export const useUnenrollData = ({ closeModal, cardId }) => {
  const [isConfirmed, setIsConfirmed] = module.state.confirmed(false);
  const confirm = () => setIsConfirmed(true);
  const reason = useUnenrollReasons({ cardId });

  let modalState;
  if (isConfirmed) {
    modalState = (reason.isSubmitted)
      ? modalStates.finished : modalStates.reason;
  } else {
    modalState = modalStates.confirm;
  }

  const close = () => {
    closeModal();
    setIsConfirmed(false);
    reason.handleClear();
  };

  return {
    isConfirmed,
    confirm,
    reason,
    close,
    closeAndRefresh: close,
    modalState,
  };
};

export default useUnenrollData;
