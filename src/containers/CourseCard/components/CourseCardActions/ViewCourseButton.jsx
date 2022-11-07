import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import ActionButton from './ActionButton';
import messages from './messages';

export const ViewCourseButton = ({ cardId }) => {
  const { homeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { formatMessage } = useIntl();
  return (
    <ActionButton
      disabled={!hasAccess}
      as="a"
      href={homeUrl}
    >
      {formatMessage(messages.viewCourse)}
    </ActionButton>
  );
};
ViewCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ViewCourseButton;
