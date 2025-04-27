import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { RequestKeys } from '../../../data/constants/requests';
import { StrictDict } from '../../../utils';

import { useUnenrollReasons } from './reasons';
import * as module from '.';

export const state = StrictDict({
  confirmed: (val) => useState(val), // eslint-disable-line
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
  const queryClient = useQueryClient();
  const refreshList = () => queryClient.invalidateQueries({ queryKey: [RequestKeys.initialize] });

  let modalState;
  if (isConfirmed) {
    modalState = (reason.isSubmitted || reason.isSkipped)
      ? modalStates.finished : modalStates.reason;
  } else {
    modalState = modalStates.confirm;
  }

  const close = () => {
    closeModal();
    setIsConfirmed(false);
    reason.handleClear();
  };
  const closeAndRefresh = () => {
    refreshList();
    close();
  };

  return {
    isConfirmed,
    confirm,
    reason,
    close,
    closeAndRefresh,
    modalState,
  };
};

export default useUnenrollData;
