import React from 'react';
import PropTypes from 'prop-types';

import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import useActionDisabledState from './hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const courseName = courseData?.course?.courseName;
  const homeUrl = courseData?.courseRun?.homeUrl;
  const handleTitleClicked = useCourseTrackingEvent(
    courseTitleClicked,
    cardId,
    homeUrl,
  );
  const { disableCourseTitle } = useActionDisabledState(cardId);
  return (
    <h3>
      {disableCourseTitle ? (
        <span className="course-card-title" data-testid="CourseCardTitle">{courseName}</span>
      ) : (
        <a
          href={homeUrl}
          className="course-card-title"
          data-testid="CourseCardTitle"
          onClick={handleTitleClicked}
        >
          {courseName}
        </a>
      )}
    </h3>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
