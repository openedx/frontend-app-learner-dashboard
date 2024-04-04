/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from '@openedx/paragon';
import { Program } from '@openedx/paragon/icons';

import RelatedProgramsBadgeModal from 'containers/RelatedProgramsModal';
import useRelatedProgramsBadgeData from './hooks';

export const RelatedProgramsBadge = ({ cardId }) => {
  const {
    isOpen, openModal, closeModal, numPrograms, programsMessage,
  } = useRelatedProgramsBadgeData({ cardId });

  if (numPrograms === 0) {
    return null;
  }

  return (
    <>
      <Button
        data-testid="RelatedProgramsBadge"
        className="pl-0 mr-0 justify-content-start align-self-start flex-shrink-1"
        variant="tertiary"
        size="sm"
        onClick={openModal}
      >
        <Icon src={Program} className="mr-2 pr-0" /> {programsMessage}
      </Button>
      <RelatedProgramsBadgeModal {...{ isOpen, closeModal, cardId }} />
    </>
  );
};
RelatedProgramsBadge.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default RelatedProgramsBadge;
