import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import messages from './messages';

export const ViewCourseButton = ({ cardId }) => {
  const { homeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { isEntitlement, isExpired } = hooks.useCardEntitlementData(cardId);
  const { formatMessage } = useIntl();
  return (
    <Button
      disabled={!hasAccess || (isEntitlement && isExpired)}
      as="a"
      href={homeUrl}
    >
      {formatMessage(messages.viewCourse)}
    </Button>
  );
};
ViewCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ViewCourseButton;
