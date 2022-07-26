import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow, Button, Form, ModalDialog,
} from '@edx/paragon';

import { nullMethod } from 'hooks';
import { dateFormatter } from 'utils';

import useSelectSession from './hooks';
import messages from './messages';

export const SelectSessionModal = ({ courseNumber }) => {
  const {
    entitlementSessions,
    showSessionModal,
    closeSessionModal,
    showLeaveSessionInSessionModal,
    courseTitle,
  } = useSelectSession({
    courseNumber,
  });

  const { formatMessage, formatDate } = useIntl();

  let header;
  let hint;
  if (showLeaveSessionInSessionModal) {
    header = formatMessage(messages.changeOrLeaveHeader);
    hint = formatMessage(messages.changeOrLeaveHint);
  } else {
    header = formatMessage(messages.selectSessionHeader, {
      courseTitle,
    });
    hint = formatMessage(messages.selectSessionHint);
  }

  return (
    <ModalDialog
      isOpen={showSessionModal}
      onClose={nullMethod}
      hasCloseButton={false}
      title=""
    >
      <div
        className="bg-white p-3 rounded shadow"
        size="md"
        style={{ textAlign: 'start' }}
      >
        <h4>{header}</h4>
        <Form.Group>
          <Form.Label>{hint}</Form.Label>
          <Form.RadioSet name="sessions">
            {entitlementSessions?.map((entitle) => (
              <Form.Radio key={entitle.startDate} value={entitle.startDate}>
                {dateFormatter(formatDate, entitle.startDate)} - {dateFormatter(formatDate, entitle.endDate)}
              </Form.Radio>
            ))}
            {showLeaveSessionInSessionModal ? (
              <Form.Radio value="leave">
                {formatMessage(messages.leaveSessionOption)}
              </Form.Radio>
            ) : null}
          </Form.RadioSet>
        </Form.Group>
        <ActionRow>
          <Button variant="tertiary" onClick={closeSessionModal}>
            {formatMessage(messages.nevermind)}
          </Button>
          <Button>{formatMessage(messages.confirmSession)}</Button>
        </ActionRow>
      </div>
    </ModalDialog>
  );
};
SelectSessionModal.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default SelectSessionModal;
