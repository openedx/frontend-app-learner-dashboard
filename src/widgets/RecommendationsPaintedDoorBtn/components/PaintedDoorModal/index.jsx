import React from 'react';
import PropTypes from 'prop-types';

import { ModalDialog, ActionRow } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from '../../messages';

import './index.scss';
import {
  trackPaintedDoorRecommendationHomeInterestBtnClicked,
  trackPaintedDoorRecommendationHomeSkipBtnClicked,
} from '../../track';

export const ModalView = ({
  isOpen,
  onClose,
  variation,
}) => {
  const { formatMessage } = useIntl();

  const handleSkipBtnClick = () => trackPaintedDoorRecommendationHomeSkipBtnClicked(variation);
  const handleInterestBtnClick = () => trackPaintedDoorRecommendationHomeInterestBtnClicked(variation);

  return (
    <div className="containers modal-container">
      <ModalDialog
        title=""
        isOpen={isOpen}
        onClose={onClose}
        hasCloseButton={false}
        isFullscreenScroll
        isBlocking
      >
        <ModalDialog.Header>
          <ModalDialog.Title className="mt-2">
            {formatMessage(messages.recommendationsModalHeading)}
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
            <ModalDialog.CloseButton variant="tertiary" onClick={handleSkipBtnClick}>
              {formatMessage(messages.modalSkipButton)}
            </ModalDialog.CloseButton>
            <ModalDialog.CloseButton variant="primary" onClick={handleInterestBtnClick}>
              {formatMessage(messages.modalCountMeButton)}
            </ModalDialog.CloseButton>
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
  variation: PropTypes.string.isRequired,
};

export default ModalView;
