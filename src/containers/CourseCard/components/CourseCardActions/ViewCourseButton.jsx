import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const ViewCourseButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { disableViewCourse } = useActionDisabledState(cardId);

  const handleClick = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl,
  );
  return (
    <ActionButton
      disabled={disableViewCourse}
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
