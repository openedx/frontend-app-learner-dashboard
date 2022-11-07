import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import ActionButton from './ActionButton';
import messages from './messages';

export const BeginCourseButton = ({ cardId }) => {
  const { homeUrl } = hooks.useCardCourseRunData(cardId);
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  return (
    <ActionButton
      disabled={isMasquerading || !hasAccess}
      as="a"
      href={homeUrl}
    >
      {formatMessage(messages.beginCourse)}
    </ActionButton>
  );
};
BeginCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default BeginCourseButton;
