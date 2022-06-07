/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { CardGrid, ModalDialog } from '@edx/paragon';

import shapes from 'data/services/lms/shapes';

import ProgramCard from './components/ProgramCard';
import messages from './messages';
import './index.scss';

export const RelatedProgramsModal = ({ isOpen, closeModal, cardData }) => {
  const { formatMessage } = useIntl();
  return (
    <ModalDialog
      title={formatMessage(messages.header)}
      isOpen={isOpen}
      onClose={closeModal}
      hasCloseButton
      isFullscreenOnMobile
      size="lg"
      className="related-programs-modal p-4"
    >
      <ModalDialog.Header className="programs-title m-0 p-0" as="h3">
        {formatMessage(messages.header)}
      </ModalDialog.Header>
      <ModalDialog.Header as="h4" className="programs-header p-0">
        {cardData.course.title}
      </ModalDialog.Header>
      <ModalDialog.Body className="pl-0">
        <p>{formatMessage(messages.description)}</p>
        <CardGrid
          columnSizes={{ lg: 6, xlg: 4, xs: 12 }}
        >
          {cardData.relatedPrograms.map(programData => <ProgramCard data={programData} />)}
        </CardGrid>
      </ModalDialog.Body>
    </ModalDialog>
  );
};
RelatedProgramsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  cardData: shapes.courseRunCardData.isRequired,
};

export default RelatedProgramsModal;
