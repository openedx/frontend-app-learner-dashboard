import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
  ModalDialog,
} from '@edx/paragon';

import { nullMethod } from 'hooks';

import hooks from './hooks';
import messages from './messages';

export const EmailSettingsModal = ({
  closeModal,
  show,
  courseNumber,
}) => {
  const dispatch = useDispatch();
  const {
    toggleValue,
    onToggle,
    save,
  } = hooks({ dispatch, closeModal, courseNumber });
  const { formatMessage } = useIntl();

  return (
    <ModalDialog
      isOpen={show}
      onClose={nullMethod}
      hasCloseButton={false}
      title=""
    >
      <div className="bg-white p-3 rounded shadow" style={{ textAlign: 'start' }}>
        <h4>{formatMessage(messages.header)}</h4>
        <Form.Switch checked={!toggleValue} onChange={onToggle}>
          {formatMessage(toggleValue ? messages.emailsOff : messages.emailsOn)}
        </Form.Switch>
        <p>{formatMessage(messages.description)}</p>
        <ActionRow>
          <Button variant="tertiary" onClick={closeModal}>
            {formatMessage(messages.nevermind)}
          </Button>
          <Button onClick={save}>{formatMessage(messages.save)}</Button>
        </ActionRow>
      </div>
    </ModalDialog>
  );
};
EmailSettingsModal.propTypes = {
  courseNumber: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EmailSettingsModal;
