import React from 'react';

import CourseCard from 'containers/CourseCard';

export const CourseList = ({ courseIDs }) => (
  <div className='d-flex flex-column flex-grow-1'>
    {courseIDs.map((id) => (
      <CourseCard courseID={id} />
    ))}
  </div>
);

export default CourseList;
