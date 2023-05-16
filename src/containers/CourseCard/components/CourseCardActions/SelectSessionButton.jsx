import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const SelectSessionButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { disableSelectSession } = useActionDisabledState(cardId);
  const openSessionModal = reduxHooks.useUpdateSelectSessionModalCallback(cardId);
  return (
    <ActionButton
      disabled={disableSelectSession}
      onClick={openSessionModal}
    >
      {formatMessage(messages.selectSession)}
    </ActionButton>
  );
};
SelectSessionButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default SelectSessionButton;
