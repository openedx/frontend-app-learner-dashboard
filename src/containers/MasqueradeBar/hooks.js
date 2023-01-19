import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { apiHooks, reduxHooks } from 'hooks';
import { StrictDict } from 'utils';
import * as module from './hooks';

import messages from './messages';

export const state = StrictDict({
  masqueradeInput: (val) => React.useState(val), // eslint-disable-line
});

export const useMasqueradeInput = () => {
  const [masqueradeInput, setMasqueradeInput] = module.state.masqueradeInput('');
  const handleMasqueradeInputChange = (e) => setMasqueradeInput(e.target.value);
  return {
    handleMasqueradeInputChange,
    masqueradeInput,
  };
};

const masqueradeErrorMessageMap = {
  404: messages.NoStudentFound,
};

export const getMasqueradeErrorMessage = (errorStatus) => {
  if (errorStatus == null) {
    return null;
  }
  return masqueradeErrorMessageMap[errorStatus] || messages.UnknownError;
};

export const useMasqueradeBarData = ({
  authenticatedUser,
}) => {
  const { formatMessage } = useIntl();
  const handleMasqueradeAs = apiHooks.useMasqueradeAs();
  const handleClearMasquerade = apiHooks.useClearMasquerade();

  const {
    isMasquerading,
    isMasqueradingFailed,
    isMasqueradingPending,
    masqueradeErrorStatus,
  } = reduxHooks.useMasqueradeData();
  const { masqueradeInput, handleMasqueradeInputChange } = module.useMasqueradeInput();

  const masqueradeErrorMessage = getMasqueradeErrorMessage(masqueradeErrorStatus);
  const handleMasqueradeSubmit = (user) => (e) => {
    handleMasqueradeAs(user);
    e.preventDefault();
  };

  return {
    canMasquerade: authenticatedUser?.administrator,
    isMasquerading,
    isMasqueradingFailed,
    isMasqueradingPending,
    masqueradeErrorMessage,
    masqueradeInput,
    handleMasqueradeSubmit,
    handleClearMasquerade,
    handleMasqueradeInputChange,
    formatMessage,
  };
};

export default useMasqueradeBarData;
