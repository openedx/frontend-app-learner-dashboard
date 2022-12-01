import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
} from '@edx/paragon';

import reasons from '../reasons';
import messages from './messages';

export const ReasonPane = ({
  reason,
  handleSubmit,
}) => {
  const { formatMessage } = useIntl();
  const option = (key) => (
    <Form.Radio key={key} value={key}>
      {formatMessage(reasons.messages[key])}
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
        {reasons.order.map(option)}
        <Form.Radio value={reasons.reasonKeys.custom}>
          <Form.Control
            {...reason.customOption}
            placeholder={formatMessage(reasons.messages.customPlaceholder)}
          />
        </Form.Radio>
      </Form.RadioSet>
      <ActionRow>
        <Button variant="tertiary" onClick={reason.skip}>
          {formatMessage(messages.reasonSkip)}
        </Button>
        <Button onClick={handleSubmit}>
          {formatMessage(messages.reasonSubmit)}
        </Button>
      </ActionRow>
    </>
  );
};
ReasonPane.propTypes = {
  reason: PropTypes.shape({
    value: PropTypes.string,
    skip: PropTypes.func,
    selectOption: PropTypes.func,
    customOption: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    selected: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ReasonPane;
