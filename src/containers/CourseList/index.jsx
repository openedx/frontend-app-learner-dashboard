import React from 'react';
import PropTypes from 'prop-types';

import CourseCard from 'containers/CourseCard';

export const CourseList = ({ courseListData }) => (
  <div className="d-flex flex-column flex-grow-1">
    {courseListData.map((courseNumber) => (
      <CourseCard key={courseNumber} courseNumber={courseNumber} />
    ))}
  </div>
);

CourseList.propTypes = {
  courseListData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseList;
