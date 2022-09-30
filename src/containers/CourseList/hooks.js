import React from 'react';
import { useDispatch } from 'react-redux';

import { useCheckboxSetValues } from '@edx/paragon';

import { StrictDict } from 'utils';
import { actions, hooks as appHooks } from 'data/redux';
import { ListPageSize, SortKeys } from 'data/constants/app';
import { RequestKeys } from 'data/constants/requests';

import * as module from './hooks';

export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

export const useCourseListData = () => {
  const dispatch = useDispatch();
  const pageNumber = appHooks.usePageNumber();
  const [filters, setFilters] = useCheckboxSetValues([]);
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.title);

  const { numPages, visible } = appHooks.useCurrentCourseList({
    sortBy,
    isAscending: true,
    filters,
    pageSize: ListPageSize,
  });
  const handleRemoveFilter = (filter) => () => setFilters.remove(filter);
  const setPageNumber = (value) => dispatch(actions.app.setPageNumber(value));
  const initIsPending = appHooks.useIsPendingRequest(RequestKeys.initialize);

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
    initIsPending,
  };
};

export default useCourseListData;
