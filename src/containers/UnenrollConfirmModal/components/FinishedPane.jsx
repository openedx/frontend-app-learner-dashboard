import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
} from '@openedx/paragon';

import messages from './messages';

export const FinishedPane = ({
  gaveReason,
  handleClose,
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <h4>{formatMessage(messages.finishHeading)}</h4>
      <p>
        {gaveReason && formatMessage(messages.finishThanksText)}
        {formatMessage(messages.finishText)}
      </p>
      <ActionRow>
        <Button onClick={handleClose}>{formatMessage(messages.finishReturn)}</Button>
      </ActionRow>
    </>
  );
};
FinishedPane.propTypes = {
  handleClose: PropTypes.func.isRequired,
  gaveReason: PropTypes.bool.isRequired,
};

export default FinishedPane;
