import React from 'react';
import PropTypes from 'prop-types';

import shapes from 'data/services/lms/shapes';
import CourseCard from 'containers/CourseCard';

export const CourseList = ({ courseListData }) => (
  <div className="d-flex flex-column flex-grow-1">
    {courseListData.map((cardData) => (
      <CourseCard cardData={cardData} />
    ))}
  </div>
);

CourseList.propTypes = {
  courseListData: PropTypes.arrayOf(shapes.courseRunCardData).isRequired,
};

export default CourseList;
