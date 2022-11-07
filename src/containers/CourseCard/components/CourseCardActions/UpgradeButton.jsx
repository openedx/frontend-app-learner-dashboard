import React from 'react';
import PropTypes from 'prop-types';

import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import ActionButton from './ActionButton';
import messages from './messages';

export const UpgradeButton = ({ cardId }) => {
  const { upgradeUrl } = hooks.useCardCourseRunData(cardId);
  const { canUpgrade } = hooks.useCardEnrollmentData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  const isEnabled = (!isMasquerading && canUpgrade);
  return (
    <ActionButton
      iconBefore={Locked}
      variant="outline-primary"
      disabled={!isEnabled}
      {...isEnabled && { as: 'a', href: upgradeUrl }}
    >
      {formatMessage(messages.upgrade)}
    </ActionButton>
  );
};
UpgradeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default UpgradeButton;
