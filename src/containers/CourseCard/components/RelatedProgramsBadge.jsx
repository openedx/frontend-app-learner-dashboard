/* eslint-disable quotes */
import React from 'react';
import { Button, useToggle } from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

import RelatedProgramsBadgeModal from 'containers/RelatedProgramsModal';

export const RelatedProgramsBadge = ({ cardData }) => {
  const [isOpen, open, closeModal] = useToggle(false);
  return (
    <>
      <Button
        variant="tertiary"
        size="sm"
        iconBefore={Program}
        onClick={open}
      >
        2 Related Program
      </Button>
      <RelatedProgramsBadgeModal {...{ isOpen, closeModal, cardData }} />
    </>
  );
};

export default RelatedProgramsBadge;
