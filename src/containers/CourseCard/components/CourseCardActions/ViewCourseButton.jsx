import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const ViewCourseButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { hasAccess, isAudit, isAuditAccessExpired } = reduxHooks.useCardEnrollmentData(cardId);
  const handleClick = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl,
  );
  // disabled on no access or (is audit track but audit access was expired)
  const disabledViewCourseButton = !hasAccess || (isAudit && isAuditAccessExpired);
  return (
    <ActionButton
      disabled={disabledViewCourseButton}
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
