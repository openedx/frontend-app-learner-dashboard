import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';

import hooks from './hooks';

export const CourseCardActions = ({ courseNumber }) => {
  const { primary, secondary } = hooks({ courseNumber });
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
