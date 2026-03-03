import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Button, Chip } from '@openedx/paragon';
import { CloseSmall } from '@openedx/paragon/icons';
import { useFilters } from 'data/context';

import messages from './messages';
import './index.scss';

export const ActiveCourseFilters = () => {
  const { formatMessage } = useIntl();
  const { filters, clearFilters, removeFilter } = useFilters();

  return (
    <div id="course-list-active-filters">
      {filters.map(filter => (
        <Chip
          key={filter}
          iconAfter={CloseSmall}
          onClick={() => removeFilter(filter)}
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

export default ActiveCourseFilters;
