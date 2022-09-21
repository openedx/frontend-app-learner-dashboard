import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import messages from './messages';

export const ResumeButton = ({ cardId }) => {
  const { resumeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess, isAudit, isAuditAccessExpired } = hooks.useCardEnrollmentData(cardId);
  const { formatMessage } = useIntl();
  return (
    <Button
      disabled={!hasAccess || (isAudit && isAuditAccessExpired)}
      as="a"
      href={resumeUrl}
    >
      {formatMessage(messages.resume)}
    </Button>
  );
};
ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ResumeButton;
