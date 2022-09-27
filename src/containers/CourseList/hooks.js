import React from 'react';

import { useCheckboxSetValues } from '@edx/paragon';

import { StrictDict } from 'utils';
import { hooks as appHooks } from 'data/redux';
import { ListPageSize, SortKeys } from 'data/constants/app';

import * as module from './hooks';

export const state = StrictDict({
  pageNumber: (val) => React.useState(val), // eslint-disable-line
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

export const useCourseListData = () => {
  const [pageNumber, setPageNumber] = module.state.pageNumber(1);
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.title);
  const [filters, setFilters] = useCheckboxSetValues([]);
  const { numPages, visible } = appHooks.useCurrentCourseList({
    sortBy,
    isAscending: true,
    filters,
    pageNumber,
    pageSize: ListPageSize,
  });
  const handleRemoveFilter = (filter) => () => setFilters.remove(filter);
  return {
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
