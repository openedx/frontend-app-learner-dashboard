import React from 'react';

import { Pagination } from '@openedx/paragon';
import {
  ActiveCourseFilters,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import { useIsCollapsed } from './hooks';
import { useCourseListData } from '../hooks';

export const CourseList = () => {
  const isCollapsed = useIsCollapsed();
  const {
    filterOptions, setPageNumber, numPages, showFilters, visibleList,
  } = useCourseListData();
  return (
    <>
      {showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveCourseFilters {...filterOptions} />
        </div>
      )}
      <div className="d-flex flex-column flex-grow-1">
        {visibleList.map(({ cardId }) => (
          <CourseCard key={cardId} cardId={cardId} />
        ))}
        {numPages > 1 && (
          <Pagination
            variant={isCollapsed ? 'reduced' : 'secondary'}
            paginationLabel="Course List"
            className="mx-auto mb-2"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </>
  );
};

export default CourseList;
