import React from 'react';
import PropTypes from 'prop-types';

import { Pagination, Row, Col } from '@openedx/paragon';
import {
  ActiveCourseFilters,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import { useIsCollapsed } from './hooks';

export const CourseList = ({ courseListData }) => {
  const {
    setPageNumber, numPages, visibleList, showFilters,
  } = courseListData;

  const isCollapsed = useIsCollapsed();
  return (
    <>
      {showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveCourseFilters />
        </div>
      )}
      <Row>
        {visibleList.map(({ cardId }) => (
          <Col key={cardId} sm={12} md={6} lg={6} className="mb-4.5">
            <CourseCard cardId={cardId} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export const courseListDataShape = PropTypes.shape({
  showFilters: PropTypes.bool.isRequired,
  visibleList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
});

CourseList.propTypes = {
  courseListData: courseListDataShape,
};

export default CourseList;
