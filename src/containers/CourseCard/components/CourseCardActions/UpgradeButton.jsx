import React from 'react';
import PropTypes from 'prop-types';

import { Locked } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';

import ActionButton from './ActionButton';
import messages from './messages';

export const UpgradeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const { upgradeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { disableUpgradeCourse } = useActionDisabledState(cardId);

  const trackUpgradeClick = reduxHooks.useTrackCourseEvent(
    track.course.upgradeClicked,
    cardId,
    upgradeUrl,
  );

  const enabledProps = {
    as: 'a',
    href: upgradeUrl,
    onClick: trackUpgradeClick,
  };
  return (
    <ActionButton
      iconBefore={Locked}
      variant="outline-primary"
      disabled={disableUpgradeCourse}
      {...!disableUpgradeCourse && enabledProps}
    >
      {formatMessage(messages.upgrade)}
    </ActionButton>
  );
};
UpgradeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default UpgradeButton;
