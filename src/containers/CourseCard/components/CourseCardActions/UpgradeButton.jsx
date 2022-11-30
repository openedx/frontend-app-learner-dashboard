import React from 'react';
import PropTypes from 'prop-types';

import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { hooks } from 'data/redux';

import ActionButton from './ActionButton';
import messages from './messages';

export const UpgradeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const { upgradeUrl } = hooks.useCardCourseRunData(cardId);
  const { canUpgrade } = hooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const trackUpgradeClick = hooks.useTrackCourseEvent(
    track.course.upgradeClicked,
    cardId,
    upgradeUrl,
  );

  const isEnabled = (!isMasquerading && canUpgrade);
  const enabledProps = {
    as: 'a',
    href: upgradeUrl,
    onClick: trackUpgradeClick,
  };
  return (
    <ActionButton
      iconBefore={Locked}
      variant="outline-primary"
      disabled={!isEnabled}
      {...isEnabled && enabledProps}
    >
      {formatMessage(messages.upgrade)}
    </ActionButton>
  );
};
UpgradeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default UpgradeButton;
