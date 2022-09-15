import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';

import { thunkActions, selectors } from 'data/redux';
import { StrictDict } from 'utils';
import * as module from './hooks';

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

export const useMasqueradeBarData = ({
  authenticatedUser,
}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const canMasquerade = authenticatedUser?.roles.includes('staff') || authenticatedUser?.administrator;

  const handleMasqueradeSubmit = (user) => () => dispatch(thunkActions.app.masqueradeAs(user));
  const handleClearMasquerade = () => dispatch(thunkActions.app.clearMasquerade());

  const {
    isMasquerading,
    isMasqueradingFailed,
    masqueradeError,
  } = useSelector(selectors.requests.masquerade);
  const { masqueradeInput, handleMasqueradeInputChange } = module.useMasqueradeInput();

  return {
    canMasquerade,
    isMasquerading,
    isMasqueradingFailed,
    masqueradeError,
    masqueradeInput,
    handleMasqueradeSubmit,
    handleClearMasquerade,
    handleMasqueradeInputChange,
    formatMessage,
  };
};

export default useMasqueradeBarData;
