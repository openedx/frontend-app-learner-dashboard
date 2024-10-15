import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@openedx/paragon';
import {
  ActiveCourseFilters,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import { useIsCollapsed } from './hooks';

export const CourseList = ({ courseListData }) => {
  const {
    filterOptions, setPageNumber, numPages, showFilters, visibleList,
  } = courseListData;
  const isCollapsed = useIsCollapsed();
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

export const courseListDataShape = PropTypes.shape({
  showFilters: PropTypes.bool.isRequired,
  visibleList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filterOptions: PropTypes.shape().isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
});

CourseList.propTypes = {
  courseListData: courseListDataShape,
};

export default CourseList;
