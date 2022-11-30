import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { hooks } from 'data/redux';
import ActionButton from './ActionButton';
import messages from './messages';

export const ViewCourseButton = ({ cardId }) => {
  const { homeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const handleClick = hooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl,
  );
  const { formatMessage } = useIntl();

  return (
    <ActionButton
      disabled={!hasAccess}
      as="a"
      href="#"
      onClick={handleClick}
    >
      {formatMessage(messages.viewCourse)}
    </ActionButton>
  );
};
ViewCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ViewCourseButton;
