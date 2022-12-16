import React from 'react';
import PropTypes from 'prop-types';

import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';

import ActionButton from './ActionButton';
import messages from './messages';

export const UpgradeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const { upgradeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { canUpgrade } = reduxHooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = reduxHooks.requests.useMasqueradeData();
  const trackUpgradeClick = reduxHooks.useTrackCourseEvent(
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
