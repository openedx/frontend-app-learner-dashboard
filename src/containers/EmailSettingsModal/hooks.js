import React from 'react';

import { StrictDict } from 'utils';
import { reduxHooks, apiHooks } from 'hooks';

import * as module from './hooks';

export const state = StrictDict({
  toggle: (val) => React.useState(val), // eslint-disable-line
});

export const useEmailData = ({
  closeModal,
  cardId,
}) => {
  const { hasOptedOutOfEmail } = reduxHooks.useCardEnrollmentData(cardId);
  const [isOptedOut, setIsOptedOut] = module.state.toggle(hasOptedOutOfEmail);
  const updateEmailSettings = apiHooks.useUpdateEmailSettings(cardId);
  const onToggle = () => setIsOptedOut(!isOptedOut);
  const save = () => {
    updateEmailSettings(!isOptedOut);
    closeModal();
  };

  return {
    onToggle,
    save,
    isOptedOut,
  };
};

export default useEmailData;
