import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@openedx/frontend-base';

import { Form } from '@openedx/paragon';

import messages from '../messages';

export const Checkbox = ({ filterKey }) => {
  const { formatMessage } = useIntl();
  return (
    <Form.Checkbox className="py-2" value={filterKey}>
      {formatMessage(messages[filterKey])}
    </Form.Checkbox>
  );
};
Checkbox.propTypes = {
  filterKey: PropTypes.string.isRequired,
};

export default Checkbox;
