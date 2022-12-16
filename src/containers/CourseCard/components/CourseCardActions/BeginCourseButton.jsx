import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const BeginCourseButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { hasAccess } = reduxHooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = reduxHooks.requests.useMasqueradeData();
  const handleClick = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl,
  );
  return (
    <ActionButton
      disabled={isMasquerading || !hasAccess}
      as="a"
      href="#"
      onClick={handleClick}
    >
      {formatMessage(messages.beginCourse)}
    </ActionButton>
  );
};
BeginCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default BeginCourseButton;
