import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import ActionButton from './ActionButton';
import messages from './messages';

export const ResumeButton = ({ cardId }) => {
  const { resumeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess, isAudit, isAuditAccessExpired } = hooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  return (
    <ActionButton
      disabled={isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired)}
      as="a"
      href={resumeUrl}
    >
      {formatMessage(messages.resume)}
    </ActionButton>
  );
};
ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ResumeButton;
