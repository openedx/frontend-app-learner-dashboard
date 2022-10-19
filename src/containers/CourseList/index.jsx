import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination, Spinner } from '@edx/paragon';

import {
  ActiveCourseFilters,
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import { isDesktopSize } from 'data/responsive';

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
    initIsPending,
  } = useCourseListData();
  const isExpand = isDesktopSize();
  return initIsPending ? (
    <div className="course-list-loading">
      <Spinner animation="border" className="mie-3" screenReaderText="loading" />
    </div>
  ) : (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
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
            variant={isExpand ? 'secondary' : 'reduced'}
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

CourseList.propTypes = {};

export default CourseList;
