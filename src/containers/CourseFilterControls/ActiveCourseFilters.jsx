import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Button, Chip } from '@openedx/paragon';
import { CloseSmall } from '@openedx/paragon/icons';

import messages from './messages';
import './index.scss';

export const ActiveCourseFilters = ({
  filters,
  setFilters,
  handleRemoveFilter,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div id="course-list-active-filters">
      {filters.map(filter => (
        <Chip
          key={filter}
          iconAfter={CloseSmall}
          onClick={handleRemoveFilter(filter)}
        >
          {formatMessage(messages[filter])}
        </Chip>
      ))}
      <Button variant="link" onClick={setFilters.clear}>
        {formatMessage(messages.clearAll)}
      </Button>
    </div>
  );
};
ActiveCourseFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilters: PropTypes.shape({
    remove: PropTypes.func,
    clear: PropTypes.func,
  }).isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
};

export default ActiveCourseFilters;
