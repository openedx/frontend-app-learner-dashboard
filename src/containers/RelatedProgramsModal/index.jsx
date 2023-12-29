/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Container, Row, Col, ModalDialog,
} from '@openedx/paragon';

import { reduxHooks } from 'hooks';
import ProgramCard from './components/ProgramCard';
import messages from './messages';
import './index.scss';

export const RelatedProgramsModal = ({
  isOpen,
  closeModal,
  cardId,
}) => {
  const { formatMessage } = useIntl();
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const relatedPrograms = reduxHooks.useCardRelatedProgramsData(cardId).list;
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
      <ModalDialog.Header className="programs-title m-0 p-0" as="h3" aria-level={2}>
        {formatMessage(messages.header)}
      </ModalDialog.Header>
      <ModalDialog.Header as="h4" className="programs-header p-0">
        {courseName}
      </ModalDialog.Header>
      <ModalDialog.Body className="pl-0 overflow-scroll">
        <p>{formatMessage(messages.description)}</p>
        <Container>
          <Row>
            {relatedPrograms.map((programData) => (
              <Col key={programData.programUrl} lg={6} sm={12}>
                <ProgramCard data={programData} />
              </Col>
            ))}
          </Row>
        </Container>
      </ModalDialog.Body>
    </ModalDialog>
  );
};
RelatedProgramsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default RelatedProgramsModal;
