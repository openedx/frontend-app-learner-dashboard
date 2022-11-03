import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import messages from './messages';

export const ViewCourseButton = ({ cardId, isSmall }) => {
  const { homeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { formatMessage } = useIntl();
  return (
    <Button
      disabled={!hasAccess}
      as="a"
      href={homeUrl}
      {...isSmall && { size: 'sm' }}
    >
      {formatMessage(messages.viewCourse)}
    </Button>
  );
};
ViewCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
  isSmall: PropTypes.bool.isRequired,
};
export default ViewCourseButton;
