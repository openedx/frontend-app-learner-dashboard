import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { SortKeys } from 'data/constants/app';

import { Form } from '@openedx/paragon';

import messages from '../messages';

export const SortForm = ({
  handleSortChange,
  sortBy,
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="filter-form-heading mb-1">{formatMessage(messages.sort)}</div>
      <Form.RadioSet
        name="sort"
        onChange={handleSortChange}
        value={sortBy}
      >
        <Form.Radio className="py-2" value={SortKeys.enrolled}>
          {formatMessage(messages.sortLastEnrolled)}
        </Form.Radio>
        <Form.Radio className="py-2" value={SortKeys.title}>
          {formatMessage(messages.sortTitle)}
        </Form.Radio>
      </Form.RadioSet>
    </>
  );
};
SortForm.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default SortForm;
