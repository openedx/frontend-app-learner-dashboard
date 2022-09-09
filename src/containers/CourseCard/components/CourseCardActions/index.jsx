import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, Button } from '@edx/paragon';

import useCardActionData from './hooks';

export const CourseCardActions = ({ cardId }) => {
  const { primary, secondary } = useCardActionData({ cardId });
  return (
    <ActionRow data-test-id="CourseCardActions">
      {(secondary !== null) && (
        <Button {...secondary} />
      )}
      <Button {...primary} />
    </ActionRow>
  );
};
CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActions;
