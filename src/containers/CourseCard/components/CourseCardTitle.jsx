import React from 'react';
import PropTypes from 'prop-types';

import track from 'tracking';
import { reduxHooks } from 'hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { isEntitlement, isFulfilled } = reduxHooks.useCardEntitlementData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const handleTitleClicked = reduxHooks.useTrackCourseEvent(courseTitleClicked, cardId, homeUrl);
  return (
    <h3>
      <a
        href={homeUrl}
        className="course-card-title"
        data-testid="CourseCardTitle"
        onClick={handleTitleClicked}
        disabled={isEntitlement && !isFulfilled}
      >
        {courseName}
      </a>
    </h3>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
