import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';

import useCardActionData from './hooks';

export const CourseCardActions = ({ courseNumber }) => {
  const { primary, secondary } = useCardActionData({ courseNumber });
  return (
    <>
      {(secondary !== null) && (
        <Button {...secondary} />
      )}
      <Button {...primary} />
    </>
  );
};
CourseCardActions.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseCardActions;
