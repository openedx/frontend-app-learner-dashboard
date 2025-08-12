import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
} from '@openedx/paragon';

import messages from './messages';

export const FinishedPane = ({
  cardId,
  handleClose,
}) => {
  const { formatMessage } = useIntl();
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const courseTitle = <span className="font-italic">“{courseName}”</span>;

  return (
    <>
      <h4>{formatMessage(messages.finishHeading)}</h4>
      <p>
        {formatMessage(messages.finishText, { courseTitle })}
      </p>
      <ActionRow>
        <Button onClick={handleClose}>{formatMessage(messages.finishReturn)}</Button>
      </ActionRow>
    </>
  );
};
FinishedPane.propTypes = {
  handleClose: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default FinishedPane;
