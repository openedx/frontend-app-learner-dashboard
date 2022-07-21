/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { CardGrid, ModalDialog } from '@edx/paragon';

import ProgramCard from './components/ProgramCard';
import messages from './messages';
import { useProgramData } from './hooks';
import './index.scss';

export const RelatedProgramsModal = ({
  isOpen,
  closeModal,
  courseNumber,
}) => {
  const { formatMessage } = useIntl();
  const { courseTitle, relatedPrograms } = useProgramData({ courseNumber });
  return (
    <ModalDialog
      title={formatMessage(messages.header)}
      isOpen={isOpen}
      onClose={closeModal}
      hasCloseButton
      isFullscreenOnMobile
      size="lg"
      className="related-programs-modal p-4"
      data-testid="RelatedProgramsModal"
    >
      <ModalDialog.Header className="programs-title m-0 p-0" as="h3">
        {formatMessage(messages.header)}
      </ModalDialog.Header>
      <ModalDialog.Header as="h4" className="programs-header p-0">
        {courseTitle}
      </ModalDialog.Header>
      <ModalDialog.Body className="pl-0">
        <p>{formatMessage(messages.description)}</p>
        <CardGrid
          columnSizes={{ lg: 6, xlg: 4, xs: 12 }}
        >
          {relatedPrograms.map((programData) => (
            <ProgramCard key={programData.programUrl} data={programData} />
          ))}
        </CardGrid>
      </ModalDialog.Body>
    </ModalDialog>
  );
};
RelatedProgramsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  courseNumber: PropTypes.string.isRequired,
};

export default RelatedProgramsModal;
