import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Button, Chip } from '@openedx/paragon';
import { CloseSmall } from '@openedx/paragon/icons';
import { reduxHooks } from 'hooks';

import messages from './messages';
import './index.scss';

export const ActiveCourseFilters = ({
  filters,
  handleRemoveFilter,
}) => {
  const { formatMessage } = useIntl();
  const clearFilters = reduxHooks.useClearFilters();
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
      <Button variant="link" onClick={clearFilters}>
        {formatMessage(messages.clearAll)}
      </Button>
    </div>
  );
};
ActiveCourseFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
};

export default ActiveCourseFilters;
