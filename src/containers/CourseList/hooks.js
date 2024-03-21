import React from 'react';

// TODO: remove this
// eslint-disable-next-line no-unused-vars
import { useCheckboxSetValues, useWindowSize, breakpoints } from '@openedx/paragon';
import queryString from 'query-string';

import { ListPageSize, SortKeys } from 'data/constants/app';
import { reduxHooks } from 'hooks';
import { StrictDict } from 'utils';

import * as module from './hooks';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.medium.maxWidth;
};

export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

// TODO: BLOCKED: docs: explain this hook
export const useCourseListData = () => {
  // TODO: refactor: filter logic to use redux
  const filters = reduxHooks.useFilters();
  const removeFilter = reduxHooks.useRemoveFilter();

  // TODO: docs:
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);

  // TODO: docs: move this up
  const pageNumber = reduxHooks.usePageNumber();

  // TODO: docs:
  const querySearch = queryString.parse(window.location.search, { parseNumbers: true });

  // TODO: docs: should this be renamed? visible sounds like a boolean
  const { numPages, visible } = reduxHooks.useCurrentCourseList({
    sortBy,
    filters,
    pageSize: querySearch?.disable_pagination === 1 ? 0 : ListPageSize,
  });

  // TODO: refactor:
  const handleRemoveFilter = (filter) => () => removeFilter(filter);

  // TODO: docs: move this up
  const setPageNumber = reduxHooks.useSetPageNumber();

  return {
    pageNumber,
    numPages,
    setPageNumber,
    visibleList: visible,
    filterOptions: {
      sortBy,
      setSortBy,
      filters,
      handleRemoveFilter,
    },
    showFilters: filters.length > 0,
  };
};

export default useCourseListData;
