import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';

import { thunkActions, hooks as appHooks } from 'data/redux';
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
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const canMasquerade = authenticatedUser?.administrator;

  const handleMasqueradeSubmit = (user) => () => dispatch(thunkActions.app.masqueradeAs(user));
  const handleClearMasquerade = () => dispatch(thunkActions.app.clearMasquerade());

  const {
    isMasquerading,
    isMasqueradingFailed,
    isMasqueradingPending,
    masqueradeErrorStatus,
  } = appHooks.useMasqueradeData();
  const { masqueradeInput, handleMasqueradeInputChange } = module.useMasqueradeInput();

  const masqueradeErrorMessage = getMasqueradeErrorMessage(masqueradeErrorStatus);

  return {
    canMasquerade,
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
