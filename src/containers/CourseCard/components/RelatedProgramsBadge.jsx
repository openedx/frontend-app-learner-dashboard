/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, useToggle } from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

import RelatedProgramsBadgeModal from 'containers/RelatedProgramsModal';

export const RelatedProgramsBadge = ({ courseNumber }) => {
  const [isOpen, open, closeModal] = useToggle(false);
  return (
    <>
      <Button
        data-testid="RelatedProgramsBadge"
        variant="tertiary"
        size="sm"
        iconBefore={Program}
        onClick={open}
      >
        2 Related Program
      </Button>
      <RelatedProgramsBadgeModal {...{ isOpen, closeModal, courseNumber }} />
    </>
  );
};
RelatedProgramsBadge.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default RelatedProgramsBadge;
