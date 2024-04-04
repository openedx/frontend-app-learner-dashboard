import React from 'react';

import queryString from 'query-string';

import { ListPageSize, SortKeys } from 'data/constants/app';
import { reduxHooks } from 'hooks';
import { StrictDict } from 'utils';

import * as module from './hooks';

export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

/**
 * Filters are fetched from the store and used to generate a list of "visible" courses.
 * Other values returned and used for the layout of the CoursesPanel component are:
 * the current page number, the sorting method, and whether or not to enable filters and pagination.
 *
 * @returns data for the CoursesPanel component
 */
export const useCourseListData = () => {
  const filters = reduxHooks.useFilters();
  const removeFilter = reduxHooks.useRemoveFilter();
  const pageNumber = reduxHooks.usePageNumber();
  const setPageNumber = reduxHooks.useSetPageNumber();

  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);

  const querySearch = queryString.parse(window.location.search, { parseNumbers: true });

  const { numPages, visibleList } = reduxHooks.useCurrentCourseList({
    sortBy,
    filters,
    pageSize: querySearch?.disable_pagination === 1 ? 0 : ListPageSize,
  });

  const handleRemoveFilter = (filter) => () => removeFilter(filter);

  return {
    pageNumber,
    numPages,
    setPageNumber,
    visibleList,
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
