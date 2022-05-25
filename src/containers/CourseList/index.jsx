import React from 'react';
import PropTypes from 'prop-types';

import CourseCard from 'containers/CourseCard';

export const CourseList = ({ courseIDs }) => (
  <div className="d-flex flex-column flex-grow-1">
    {courseIDs.map((id) => (
      <CourseCard courseID={id} />
    ))}
  </div>
);
CourseList.propTypes = {
  courseIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseList;
