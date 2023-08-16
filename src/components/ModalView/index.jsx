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

  return (
    <div className="containers">
      <ModalDialog
        title=""
        isOpen={isOpen}
        onClose={onClose}
        hasCloseButton={false}
        isFullscreenScroll
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            <h3 className="mt-2">{formatMessage(messages.recommendationsModalHeading)}</h3>
          </ModalDialog.Title>
        </ModalDialog.Header>
        <ModalDialog.Body>
          <div>
            <p className="mt-2">{formatMessage(messages.recommendationsFeatureText)}</p>
            <p>{formatMessage(messages.recommendationsAlertText)}</p>
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
};

ModalView.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

export default ModalView;
