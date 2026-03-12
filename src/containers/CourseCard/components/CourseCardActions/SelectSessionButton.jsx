import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@openedx/frontend-base';

import { useSelectSessionModal } from '@src/data/context';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const SelectSessionButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { disableSelectSession } = useActionDisabledState(cardId);
  const { updateSelectSessionModal } = useSelectSessionModal();
  return (
    <ActionButton
      disabled={disableSelectSession}
      onClick={() => updateSelectSessionModal(cardId)}
    >
      {formatMessage(messages.selectSession)}
    </ActionButton>
  );
};
SelectSessionButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default SelectSessionButton;
