/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

import RelatedProgramsBadgeModal from 'containers/RelatedProgramsModal';
import useRelatedProgramsBadgeData from './hooks';

export const RelatedProgramsBadge = ({ cardId }) => {
  const {
    isOpen,
    openModal,
    closeModal,
    numPrograms,
    programsMessage,
  } = useRelatedProgramsBadgeData({ cardId });
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
      <RelatedProgramsBadgeModal {...{ isOpen, closeModal, cardId }} />
    </>
  );
};
RelatedProgramsBadge.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default RelatedProgramsBadge;
