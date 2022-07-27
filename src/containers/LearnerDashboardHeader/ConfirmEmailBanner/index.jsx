/* eslint-disable max-len */
import React from 'react';
import {
  PageBanner, ModalDialog, MarketingModal, Button,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import messages from './messages';
import './ConfirmEmailBanner.scss';

export const ConfirmEmailBanner = () => {
  const { isNeeded } = appHooks.useEmailConfirmationData();
  const [show, setShow] = React.useState(isNeeded);
  const [isOpen, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  const { formatMessage } = useIntl();

  if (!isNeeded) { return null; }

  return (
    <>
      <PageBanner show={show} dismissible onDismiss={() => setShow(false)}>
        {formatMessage(messages.confirmEmailTextReminderBanner, {
          confirmNowButton: (
            <Button
              className="confirm-email-now-button"
              variant="link"
              size="inline"
              onClick={() => {
                setOpen(true);
                setShow(false);
              }}
            >
              {formatMessage(messages.confirmNowButton)}
            </Button>
          ),
        })}
      </PageBanner>
      <MarketingModal
        title="My dialog"
        isOpen={isOpen}
        onClose={close}
        hasCloseButton={false}
        heroNode={(
          <ModalDialog.Hero className="bg-gray-300">
            <img className="m-auto" src="confirm-email.svg" alt="" />
          </ModalDialog.Hero>
        )}
        footerNode={(
          <Button className="mx-auto my-3" variant="danger" onClick={close}>
            {formatMessage(messages.verifiedConfirmEmailButton)}
          </Button>
        )}
      >
        <h1 className="text-center p-3">{formatMessage(messages.confirmEmailModalHeader)}</h1>
        <p className="text-center">{formatMessage(messages.confirmEmailModalBody)}</p>
      </MarketingModal>
    </>
  );
};
ConfirmEmailBanner.propTypes = {};

export default ConfirmEmailBanner;
