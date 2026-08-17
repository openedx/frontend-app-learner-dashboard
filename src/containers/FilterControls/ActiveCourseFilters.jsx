import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Button, Chip } from '@openedx/paragon';
import { CloseSmall } from '@openedx/paragon/icons';
import { useFilters } from 'data/context';

import messages from './messages';
import './index.scss';

export const ActiveCourseFilters = () => {
  const { formatMessage } = useIntl();
  const {
    filters,
    clearFilters,
    removeFilter,
    categories,
    removeCategory,
    clearCategories,
  } = useFilters();

  const handleClear = () => {
    clearFilters();
    clearCategories();
  };

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
      {categories.map(category => (
        <Chip
          key={category.id}
          iconAfter={CloseSmall}
          onClick={() => removeCategory(category.id)}
        >
          {category.text}
        </Chip>
      ))}
      <Button variant="link" onClick={handleClear}>
        {formatMessage(messages.clearAll)}
      </Button>
    </div>
  );
};

export default ActiveCourseFilters;
