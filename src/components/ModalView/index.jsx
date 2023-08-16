import React from 'react';
import PropTypes from 'prop-types';

import { ModalDialog, ActionRow, Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

export const ModalView = ({
  isOpen,
  onClose,
}) => {
  const { formatMessage } = useIntl();

  const handleClose = () => {
    onClose(false);
  };
  return (
    <div className="containers">
      <ModalDialog
        title=""
        isOpen={isOpen}
        onClose={handleClose}
        hasCloseButton={false}
        isFullscreenScroll
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            <h3 className="mt-2">{formatMessage(messages.recommendationsModalHeading)}</h3>
          </ModalDialog.Title>
        </ModalDialog.Header>
        <ModalDialog.Body>
          <div className="modal-continer">
            <p className="mt-2">{formatMessage(messages.recommendationsFeatureText)}</p>
            <p>{formatMessage(messages.recommendationsAlertedText)}</p>
          </div>
        </ModalDialog.Body>
        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage(messages.modalSkipButton)}
            </ModalDialog.CloseButton>
            <Button variant="primary">{formatMessage(messages.modalCountMeButton)}</Button>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </div>
  );
};

ModalView.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

ModalView.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ModalView;
