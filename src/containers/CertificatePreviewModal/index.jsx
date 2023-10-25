import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalDialog,
} from '@edx/paragon';
import { UpgradeButton } from '../CourseCard/components/CourseCardActions/UpgradeButton';
import useCertificatePreviewData from './hooks';

export const CertificatePreviewModal = ({
  cardId,
}) => {
  const {
    showModal,
    header,
    closePreviewModal,
    getCertificatePreviewUrl,
  } = useCertificatePreviewData();

  return (
    <ModalDialog
      isOpen={showModal}
      onClose={closePreviewModal}
      hasCloseButton
      isFullscreenOnMobile
      size="lg"
      className="p-4 px-4.5"
      title={header}
    >
      <h3>{header}</h3>
      <div>
        <iframe
          title={header}
          src={getCertificatePreviewUrl()}
          width={725}
          height={400}
        />
      </div>
      <UpgradeButton
        cardId={cardId}
      />
    </ModalDialog>
  );
};
CertificatePreviewModal.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CertificatePreviewModal;
