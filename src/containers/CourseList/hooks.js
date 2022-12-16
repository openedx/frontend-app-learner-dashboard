import React from 'react';

import { useCheckboxSetValues, useWindowSize, breakpoints } from '@edx/paragon';

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

export const useCourseListData = () => {
  const [filters, setFilters] = useCheckboxSetValues([]);
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);
  const pageNumber = reduxHooks.usePageNumber();
  const { numPages, visible } = reduxHooks.useCurrentCourseList({
    sortBy,
    filters,
    pageSize: ListPageSize,
  });
  const handleRemoveFilter = (filter) => () => setFilters.remove(filter);
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
