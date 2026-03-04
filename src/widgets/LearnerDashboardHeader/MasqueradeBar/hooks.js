import { useState, useMemo } from 'react';
import { useIntl } from '@openedx/frontend-base';

import { useMasquerade } from '../../../data/context';
import { useInitializeLearnerHome } from '../../../data/hooks';

import messages from './messages';

export const useMasqueradeBarData = ({
  authenticatedUser,
}) => {
  const { formatMessage } = useIntl();
  const [masqueradeInput, setMasqueradeInput] = useState('');
  const { masqueradeUser, setMasqueradeUser } = useMasquerade();
  const {
    isError, error, isPending,
  } = useInitializeLearnerHome();

  const handleMasqueradeInputChange = (e) => setMasqueradeInput(e.target.value);
  const handleClearMasquerade = () => {
    setMasqueradeUser(undefined);
    setMasqueradeInput('');
  };
  const handleMasqueradeSubmit = (user) => (e) => {
    setMasqueradeUser(user);
    e.preventDefault();
  };

  const isMasqueradingFailed = !!masqueradeUser && !!masqueradeInput && isError;
  const isMasqueradingPending = !!masqueradeUser && isPending;
  const isMasquerading = !!masqueradeUser && !isError && !isPending;
  const masqueradeErrorMessage = useMemo(() => {
    if (masqueradeUser && error) {
      return (error.customAttributes?.httpErrorStatus === 404 ? messages.NoStudentFound : messages.UnknownError);
    }
    return null;
  }, [error, masqueradeUser]);

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
