import React from 'react';
import { useDispatch } from 'react-redux';

import { useCheckboxSetValues, useWindowSize, breakpoints } from '@edx/paragon';

import { StrictDict } from 'utils';
import { actions, hooks as appHooks } from 'data/redux';
import { ListPageSize, SortKeys } from 'data/constants/app';

import * as module from './hooks';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.medium.maxWidth;
};

export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

export const useCourseListData = () => {
  const dispatch = useDispatch();
  const pageNumber = appHooks.usePageNumber();
  const [filters, setFilters] = useCheckboxSetValues([]);
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);

  const { numPages, visible } = appHooks.useCurrentCourseList({
    sortBy,
    filters,
    pageSize: ListPageSize,
  });
  const handleRemoveFilter = (filter) => () => setFilters.remove(filter);
  const setPageNumber = (value) => dispatch(actions.app.setPageNumber(value));

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
