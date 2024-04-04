import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
  ModalDialog,
} from '@openedx/paragon';

import { nullMethod } from 'utils';

import useEmailData from './hooks';
import messages from './messages';

export const EmailSettingsModal = ({
  closeModal,
  show,
  cardId,
}) => {
  const {
    isOptedOut,
    onToggle,
    save,
  } = useEmailData({ closeModal, cardId });
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
        <Form.Switch checked={!isOptedOut} onChange={onToggle}>
          {formatMessage(isOptedOut ? messages.emailsOff : messages.emailsOn)}
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
  cardId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EmailSettingsModal;
