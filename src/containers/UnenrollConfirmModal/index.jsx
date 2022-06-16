import React from 'react';
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
}) => {
  const dispatch = useDispatch();
  const {
    confirm,
    reason,
    closeAndRefresh,
    close,
    modalState,
  } = useUnenrollData({ dispatch, closeModal });
  return (
    <ModalDialog
      isOpen={show}
      onClose={nullMethod}
      hasCloseButton={false}
      title=""
    >
      <div className="bg-white p-3 rounded shadow" style={{ textAlign: 'start' }}>
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
};

export default UnenrollConfirmModal;
