import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  ActionRow,
  Button,
  Form,
  ModalPopup,
} from '@edx/paragon';

import { nullMethod } from 'hooks';

import reasons from './reasons';
import hooks from './hooks';
import messages from './messages';

export const UnenrollConfirmModal = ({
  closeModal,
  show,
  menuRef,
}) => {
  if (!menuRef.current) {
    return null;
  }
  const dispatch = useDispatch();
  const {
    isConfirmed,
    confirm,
    reason,
    closeAndRefresh,
  } = hooks({ dispatch, closeModal });
  const { formatMessage } = useIntl();

  const option = (key) => (
    <Form.Radio key={key} value={key}>
      {formatMessage(reasons.messages[key])}
    </Form.Radio>
  );
  return (
    <ModalPopup
      positionRef={menuRef.current}
      placement="bottom-end"
      isOpen={show}
      onClose={nullMethod}
    >
      <div className="bg-white p-3 rounded shadow" style={{ textAlign: 'start' }}>
        {!isConfirmed && (
          <>
            <h4>{formatMessage(messages.confirmHeader)}</h4>
            <p>{formatMessage(messages.confirmText)}</p>
            <ActionRow>
              <Button variant="tertiary" onClick={closeModal}>
                {formatMessage(messages.confirmCancel)}
              </Button>
              <Button onClick={confirm}>
                {formatMessage(messages.confirmUnenroll)}
              </Button>
            </ActionRow>
          </>
        )}
        {isConfirmed && !reason.isSubmitted && (
          <>
            <h4>{formatMessage(messages.reasonHeading)}</h4>
            <Form.RadioSet
              name="unenrollReason"
              onChange={reason.selectOption}
              value={reason.selectedReason}
            >
              {reasons.order.map(option)}
              <Form.Radio value={reasons.reasonKeys.custom}>
                <Form.Control
                  {...reason.customOption}
                  placeholder={formatMessage(reasons.messages.customPlaceholder)}
                />
              </Form.Radio>
            </Form.RadioSet>
            <ActionRow>
              <Button variant="tertiary" onClick={reason.skip}>
                {formatMessage(messages.reasonSkip)}
              </Button>
              <Button onClick={reason.submit}>
                {formatMessage(messages.reasonSubmit)}
              </Button>
            </ActionRow>
          </>
        )}
        {isConfirmed && reason.isSubmitted && (
          <>
            <h4>{formatMessage(messages.finishHeading)}</h4>
            <p>{formatMessage(messages.finishText)}</p>
            <ActionRow>
              <Button onClick={closeAndRefresh}>{formatMessage(messages.finishReturn)}</Button>
            </ActionRow>
          </>
        )}
      </div>
    </ModalPopup>
  );
};
UnenrollConfirmModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  menuRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};


export default UnenrollConfirmModal;
