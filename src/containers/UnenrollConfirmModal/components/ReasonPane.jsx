import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
} from '@openedx/paragon';

import constants from '../constants';
import messages from './messages';

export const ReasonPane = ({
  reason,
}) => {
  const { formatMessage } = useIntl();
  const option = (key) => (
    <Form.Radio key={key} value={key}>
      {formatMessage(constants.messages[key])}
    </Form.Radio>
  );
  return (
    <>
      <h4>{formatMessage(messages.reasonHeading)}</h4>
      <Form.RadioSet
        name="unenrollReason"
        onChange={reason.selectOption}
        value={reason.selected}
      >
        {constants.order.map(option)}
        <Form.Radio value={constants.reasonKeys.custom}>
          <Form.Control
            {...reason.customOption}
            placeholder={formatMessage(constants.messages.customPlaceholder)}
          />
        </Form.Radio>
      </Form.RadioSet>
      <ActionRow>
        <Button variant="tertiary" onClick={reason.handleSkip}>
          {formatMessage(messages.reasonSkip)}
        </Button>
        <Button disabled={!reason.hasReason} onClick={reason.handleSubmit}>
          {formatMessage(messages.reasonSubmit)}
        </Button>
      </ActionRow>
    </>
  );
};
ReasonPane.propTypes = {
  reason: PropTypes.shape({
    value: PropTypes.string,
    handleSkip: PropTypes.func,
    hasReason: PropTypes.bool,
    selectOption: PropTypes.func,
    customOption: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    selected: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReasonPane;
