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

import hooks from './hooks';

export const UnenrollConfirmModal = ({
  closeModal,
  show,
}) => {
  const dispatch = useDispatch();
  const {
    isConfirmed,
    confirm,
    reason,
    closeAndRefresh,
    close,
  } = hooks({ dispatch, closeModal });
  return (
    <ModalDialog
      isOpen={show}
      onClose={nullMethod}
      hasCloseButton={false}
    >
      <div className="bg-white p-3 rounded shadow" style={{ textAlign: 'start' }}>
        {!isConfirmed && <ConfirmPane handleClose={close} handleConfirm={confirm} />}
        {isConfirmed && !reason.isSubmitted && <ReasonPane reason={reason} />}
        {isConfirmed && reason.isSubmitted && (
          <FinishedPane
            handleClose={closeAndRefresh}
            gaveReason={!reason.isSkipped}
          />
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
