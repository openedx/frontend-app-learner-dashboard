import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ModalDialog } from '@openedx/paragon';

import { nullMethod } from 'utils';

import ConfirmPane from './components/ConfirmPane';
import ReasonPane from './components/ReasonPane';
import FinishedPane from './components/FinishedPane';

import { useUnenrollData, modalStates } from './hooks';

export const UnenrollConfirmModal = ({
  closeModal,
  show,
  cardId,
}) => {
  const {
    confirm,
    reason,
    closeAndRefresh,
    close,
    modalState,
  } = useUnenrollData({ closeModal, cardId });
  const showFullscreen = modalState === modalStates.reason;
  return (
    <ModalDialog
      isOpen={show}
      onClose={nullMethod}
      hasCloseButton={false}
      isFullscreenOnMobile={showFullscreen}
      title=""
    >
      <div
        className={classNames('bg-white p-3 rounded', { shadow: !showFullscreen })}
        style={{ textAlign: 'start' }}
      >
        {(modalState === modalStates.confirm) && (
          <ConfirmPane handleClose={close} handleConfirm={confirm} />
        )}
        {(modalState === modalStates.finished) && (
          <FinishedPane handleClose={closeAndRefresh} gaveReason={!reason.isSkipped} />
        )}
        {(modalState === modalStates.reason) && (
          <ReasonPane reason={reason} />
        )}
      </div>
    </ModalDialog>
  );
};
UnenrollConfirmModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default UnenrollConfirmModal;
