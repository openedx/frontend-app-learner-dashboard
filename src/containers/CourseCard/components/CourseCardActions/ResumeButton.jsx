import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const ResumeButton = ({ cardId }) => {
  const { resumeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { hasAccess, isAudit, isAuditAccessExpired } = reduxHooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  const handleClick = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    resumeUrl,
  );
  return (
    <ActionButton
      disabled={isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired)}
      as="a"
      href="#"
      onClick={handleClick}
    >
      {formatMessage(messages.resume)}
    </ActionButton>
  );
};
ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ResumeButton;
