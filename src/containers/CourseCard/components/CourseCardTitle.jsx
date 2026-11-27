import React from 'react';
import PropTypes from 'prop-types';

import track from '@src/tracking';
import { useCourseData, useCourseTrackingEvent } from '@src/hooks';
import { courseHomeUrl } from '@src/data/services/lms/urls';
import CourseLink from './CourseLink';
import useActionDisabledState from './hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const courseName = courseData?.course?.courseName;
  const homeUrl = courseHomeUrl(courseData?.courseRun?.courseId, courseData?.courseRun?.homeUrl);
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
        <CourseLink
          href={homeUrl}
          className="course-card-title"
          data-testid="CourseCardTitle"
          onClick={handleTitleClicked}
        >
          {courseName}
        </CourseLink>
      )}
    </h3>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
