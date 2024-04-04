import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
  ModalDialog,
} from '@openedx/paragon';

import { utilHooks } from 'hooks';
import { nullMethod, dateFormatter } from 'utils';

import useSelectSessionModalData from './hooks';
import { LEAVE_OPTION } from './constants';
import messages from './messages';

export const SelectSessionModal = () => {
  const {
    availableSessions,
    showModal,
    closeSessionModal,
    showLeaveOption,
    handleSelection,
    handleSubmit,
    header,
    hint,
    selectedSession,
  } = useSelectSessionModalData();

  const formatDate = utilHooks.useFormatDate();
  const { formatMessage } = useIntl();

  return (
    <ModalDialog
      isOpen={showModal}
      onClose={nullMethod}
      hasCloseButton={false}
      isFullscreenOnMobile
      size="md"
      className="p-4 px-4.5"
      title={header}
    >
      <h3>{header}</h3>
      <Form.Group className="pt-3">
        <Form.Label>{hint}</Form.Label>
        <Form.RadioSet
          name="sessions"
          className="pt-3 pb-4"
          onChange={handleSelection}
          value={selectedSession}
        >
          {availableSessions?.map((session) => (
            <Form.Radio key={session.courseId} value={session.courseId}>
              {dateFormatter(formatDate, session.startDate)} - {dateFormatter(formatDate, session.endDate)}
            </Form.Radio>
          ))}
          {showLeaveOption && (
            <Form.Radio value={LEAVE_OPTION}>
              {formatMessage(messages.leaveSessionOption)}
            </Form.Radio>
          )}
        </Form.RadioSet>
      </Form.Group>
      <ActionRow>
        <Button variant="tertiary" onClick={closeSessionModal}>
          {formatMessage(messages.nevermind)}
        </Button>
        <Button onClick={handleSubmit}>{formatMessage(messages.confirmSession)}</Button>
      </ActionRow>
    </ModalDialog>
  );
};

export default SelectSessionModal;
