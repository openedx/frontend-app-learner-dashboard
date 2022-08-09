import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
  ModalDialog,
} from '@edx/paragon';

import { nullMethod } from 'hooks';
import { dateFormatter } from 'utils';

import useSelectSessionModalData from './hooks';
import messages from './messages';

export const SelectSessionModal = () => {
  const {
    entitlementSessions,
    showModal,
    closeSessionModal,
    showLeaveOption,
    header,
    hint,
  } = useSelectSessionModalData();

  const { formatMessage, formatDate } = useIntl();

  return (
    <ModalDialog
      isOpen={showModal}
      onClose={nullMethod}
      hasCloseButton={false}
      size="md"
      className="p-4 px-4.5"
      title={header}
    >
      <h3>{header}</h3>
      <Form.Group className="pt-3">
        <Form.Label>{hint}</Form.Label>
        <Form.RadioSet name="sessions" className="pt-3 pb-4">
          {entitlementSessions?.map((session) => (
            <Form.Radio key={session.startDate} value={session.startDate}>
              {dateFormatter(formatDate, session.startDate)} - {dateFormatter(formatDate, session.endDate)}
            </Form.Radio>
          ))}
          {showLeaveOption && (
            <Form.Radio value="leave">
              {formatMessage(messages.leaveSessionOption)}
            </Form.Radio>
          )}
        </Form.RadioSet>
      </Form.Group>
      <ActionRow>
        <Button variant="tertiary" onClick={closeSessionModal}>
          {formatMessage(messages.nevermind)}
        </Button>
        <Button>{formatMessage(messages.confirmSession)}</Button>
      </ActionRow>
    </ModalDialog>
  );
};

export default SelectSessionModal;
