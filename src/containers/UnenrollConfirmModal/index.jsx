import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ModalDialog,
} from '@edx/paragon';

import { nullMethod } from 'hooks';

import ConfirmPane from './components/ConfirmPane';
import ReasonPane from './components/ReasonPane';
import FinishedPane from './components/FinishedPane';

import { useUnenrollData, modalStates } from './hooks';

export const UnenrollConfirmModal = ({
  closeModal,
  show,
  cardId,
}) => {
  const dispatch = useDispatch();
  const {
    confirm,
    reason,
    closeAndRefresh,
    close,
    modalState,
    handleSubmitReason,
  } = useUnenrollData({ dispatch, closeModal, cardId });
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
          <ReasonPane reason={reason} handleSubmit={handleSubmitReason} />
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
