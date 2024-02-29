import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
} from '@openedx/paragon';

import messages from './messages';

export const ConfirmPane = ({
  handleClose,
  handleConfirm,
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <h4>{formatMessage(messages.confirmHeader)}</h4>
      <ActionRow>
        <Button variant="tertiary" onClick={handleClose}>
          {formatMessage(messages.confirmCancel)}
        </Button>
        <Button onClick={handleConfirm}>
          {formatMessage(messages.confirmUnenroll)}
        </Button>
      </ActionRow>
    </>
  );
};
ConfirmPane.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmPane;
