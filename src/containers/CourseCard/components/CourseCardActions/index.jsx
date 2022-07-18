import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';

import useCardActionData from './hooks';

export const CourseCardActions = ({ courseNumber }) => {
  const { primary, secondary } = useCardActionData({ courseNumber });
  return (
    <div data-test-id="CourseCardActions">
      {(secondary !== null) && (
        <Button {...secondary} />
      )}
      <Button {...primary} />
    </div>
  );
};
CourseCardActions.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseCardActions;
