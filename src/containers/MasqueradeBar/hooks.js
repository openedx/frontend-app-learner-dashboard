// TODO: not being used
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useInitializeLearnerHome } from 'data/hooks';
import { useMasquerade } from 'data/context';
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
  const query = useInitializeLearnerHome();

  const {
    isMasquerading,
    setMasqueradeUser,
  } = useMasquerade();

  const isMasqueradingPending = isMasquerading && query?.isPending;
  const isMasqueradingFailed = isMasquerading && query?.isError;
  const masqueradeErrorStatus = isMasquerading && query?.isError ? query?.error : null;
  const { masqueradeInput, handleMasqueradeInputChange } = module.useMasqueradeInput();

  const masqueradeErrorMessage = getMasqueradeErrorMessage(masqueradeErrorStatus);

  const handleMasqueradeSubmit = (user) => (e) => {
    setMasqueradeUser(user);
    e.preventDefault();
  };

  const handleClearMasquerade = () => {
    setMasqueradeUser(undefined);
    handleMasqueradeInputChange({ target: { value: '' } });
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
