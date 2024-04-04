/* eslint-disable max-len */
import React from 'react';
import {
  Button,
  Image,
  MarketingModal,
  ModalDialog,
  PageBanner,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import confirmEmailSVG from 'assets/confirm-email.svg';
import messages from './messages';
import './ConfirmEmailBanner.scss';
import useConfirmEmailBannerData from './hooks';

export const ConfirmEmailBanner = () => {
  const {
    isNeeded,
    showConfirmModal,
    showPageBanner,
    closePageBanner,
    closeConfirmModal,
    openConfirmModalButtonClick,
    userConfirmEmailButtonClick,
  } = useConfirmEmailBannerData();
  const { formatMessage } = useIntl();

  if (!isNeeded) { return null; }

  return (
    <>
      <PageBanner show={showPageBanner} dismissible onDismiss={closePageBanner}>
        {formatMessage(messages.confirmEmailTextReminderBanner, {
          confirmNowButton: (
            <Button
              className="confirm-email-now-button"
              variant="link"
              size="inline"
              onClick={openConfirmModalButtonClick}
            >
              {formatMessage(messages.confirmNowButton)}
            </Button>
          ),
        })}
      </PageBanner>
      <MarketingModal
        title=""
        isOpen={showConfirmModal}
        onClose={closeConfirmModal}
        hasCloseButton={false}
        heroNode={(
          <ModalDialog.Hero className="bg-gray-300">
            <Image
              className="m-auto"
              src={confirmEmailSVG}
              alt={formatMessage(messages.confirmEmailImageAlt)}
            />
          </ModalDialog.Hero>
        )}
        footerNode={(
          <Button className="mx-auto my-3" variant="danger" onClick={userConfirmEmailButtonClick}>
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
