import React from 'react';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import {
  Pagination,
  useCheckboxSetValues,
} from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';
import { ListPageSize, SortKeys } from 'data/constants/app';
import { ActiveCourseFilters, CourseFilterControls } from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import messages from './messages';

import './index.scss';

export const useCourseListData = () => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [sortBy, setSortBy] = React.useState(SortKeys.title);
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

export const CourseList = () => {
  const {
    filterOptions,
    setPageNumber,
    numPages,
    showFilters,
    visibleList,
  } = useCourseListData();
  return (
    <div className="course-list-container">
      <div id="course-list-heading-container">
        <h2 className="my-3">
          <FormattedMessage {...messages.myCourses} />
        </h2>
        <div
          id="course-filter-controls-container"
          className="text-right"
        >
          <CourseFilterControls {...filterOptions} />
        </div>
      </div>
      { showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveCourseFilters {...filterOptions} />
        </div>
      )}
      <div className="d-flex flex-column flex-grow-1">
        {visibleList.map(({ cardId }) => (
          <CourseCard key={cardId} cardId={cardId} />
        ))}
        {(numPages > 1) && (
          <Pagination
            variant="secondary"
            paginationLabel="Course List"
            className="mx-auto"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </div>
  );
};

CourseList.propTypes = {
};

export default CourseList;
