/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

import RelatedProgramsBadgeModal from 'containers/RelatedProgramsModal';
import useRelatedProgramsBadgeData from './hooks';

export const RelatedProgramsBadge = ({ courseNumber }) => {
  const {
    isOpen,
    openModal,
    closeModal,
    numPrograms,
    programsMessage,
  } = useRelatedProgramsBadgeData({ courseNumber });
  return (numPrograms > 0) && (
    <>
      <Button
        data-testid="RelatedProgramsBadge"
        variant="tertiary"
        size="sm"
        iconBefore={Program}
        onClick={openModal}
      >
        {programsMessage}
      </Button>
      <RelatedProgramsBadgeModal {...{ isOpen, closeModal, courseNumber }} />
    </>
  );
};
RelatedProgramsBadge.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default RelatedProgramsBadge;
