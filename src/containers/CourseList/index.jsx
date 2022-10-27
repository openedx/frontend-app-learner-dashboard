import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination } from '@edx/paragon';

import {
  ActiveCourseFilters,
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import { useCourseListData } from './hooks';

import messages from './messages';

import './index.scss';

export const CourseList = () => {
  const { formatMessage } = useIntl();
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
        <h2 className="mb-4.5">{formatMessage(messages.myCourses)}</h2>
        <div id="course-filter-controls-container" className="text-right">
          <CourseFilterControls {...filterOptions} />
        </div>
      </div>
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
            variant="secondary"
            paginationLabel="Course List"
            className="mx-auto pagination"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </div>
  );
};

CourseList.propTypes = {};

export default CourseList;
