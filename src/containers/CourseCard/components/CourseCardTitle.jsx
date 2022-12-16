import React from 'react';
import PropTypes from 'prop-types';

import track from 'tracking';
import { hooks as appHooks } from 'data/redux';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const { courseName } = appHooks.useCardCourseData(cardId);
  const { isEntitlement, isFulfilled } = appHooks.useCardEntitlementData(cardId);
  const { homeUrl } = appHooks.useCardCourseRunData(cardId);
  const handleTitleClicked = appHooks.useTrackCourseEvent(courseTitleClicked, cardId, homeUrl);
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
