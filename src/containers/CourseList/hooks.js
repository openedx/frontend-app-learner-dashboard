import React from 'react';

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

// TODO: find out why we are wrapping useState in a function???
// TODO: WTF is StrictDict???
// TODO: do we want to move sortBy to redux as well?
export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

// TODO: BLOCKED: docs: explain this hook
export const useCourseListData = () => {
  // TODO: refactor: filter logic to use redux
  // const [filters, setFilters] = useCheckboxSetValues([]);
  const filters = reduxHooks.useFilters();
  const removeFilter = reduxHooks.useRemoveFilter();
  const setFilters = reduxHooks.useSetFilters();

  // TODO: docs:
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);

  // TODO: docs:
  const pageNumber = reduxHooks.usePageNumber();
  // NOTE: consider replicating logic used for pageNumber

  // TODO: docs:
  const querySearch = queryString.parse(window.location.search, { parseNumbers: true });

  // TODO: docs:
  const { numPages, visible } = reduxHooks.useCurrentCourseList({
    sortBy,
    filters,
    pageSize: querySearch?.disable_pagination === 1 ? 0 : ListPageSize,
  });

  // TODO: refactor:
  const handleRemoveFilter = (filter) => () => removeFilter(filter);
  // TODO: docs:
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
      setFilters,
      handleRemoveFilter,
    },
    showFilters: filters.length > 0,
  };
};

export default useCourseListData;
