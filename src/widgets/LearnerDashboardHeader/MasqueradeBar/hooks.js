import { useState, useContext } from 'react';
import { useIntl } from '@openedx/frontend-base';

import MasqueradeUserContext from '../../../data/contexts/MasqueradeUserContext';
import { StrictDict } from '../../../utils';

import * as module from './hooks';
import messages from './messages';

export const state = StrictDict({
  masqueradeInput: (val) => useState(val), // eslint-disable-line
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
  return masqueradeErrorMessageMap[errorStatus] ?? messages.UnknownError;
};

export const useMasqueradeBarData = ({
  authenticatedUser,
}) => {
  const { formatMessage } = useIntl();
  const { setMasqueradeUser } = useContext(MasqueradeUserContext);
  const handleClearMasquerade = () => setMasqueradeUser(null);

  const {
    masqueradeIsSuccess,
    masqueradeIsPending,
    masqueradeIsError,
    masqueradeError,
  } = useContext(MasqueradeUserContext);
  const { masqueradeInput, handleMasqueradeInputChange } = module.useMasqueradeInput();

  const masqueradeErrorMessage = getMasqueradeErrorMessage(masqueradeError?.customAttributes?.httpErrorStatus);
  const handleMasqueradeSubmit = (user) => (e) => {
    setMasqueradeUser(user);
    e.preventDefault();
  };

  return {
    canMasquerade: authenticatedUser?.administrator,
    isMasquerading: masqueradeIsSuccess,
    isMasqueradingFailed: masqueradeIsError,
    isMasqueradingPending: masqueradeIsPending,
    masqueradeErrorMessage,
    masqueradeInput,
    handleMasqueradeSubmit,
    handleClearMasquerade,
    handleMasqueradeInputChange,
    formatMessage,
  };
};

export default useMasqueradeBarData;
