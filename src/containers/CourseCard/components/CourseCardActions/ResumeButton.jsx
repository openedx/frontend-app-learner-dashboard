import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import messages from './messages';

export const ResumeButton = ({ cardId, isSmall }) => {
  const { resumeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess, isAudit, isAuditAccessExpired } = hooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  return (
    <Button
      disabled={isMasquerading || !hasAccess || (isAudit && isAuditAccessExpired)}
      as="a"
      href={resumeUrl}
      {...isSmall && { size: 'sm' }}
    >
      {formatMessage(messages.resume)}
    </Button>
  );
};
ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
  isSmall: PropTypes.bool.isRequired,
};
export default ResumeButton;
