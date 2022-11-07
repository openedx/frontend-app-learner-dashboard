import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import ActionButton from './ActionButton';
import messages from './messages';

export const SelectSessionButton = ({ cardId }) => {
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { canChange, hasSessions } = hooks.useCardEntitlementData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  const openSessionModal = hooks.useUpdateSelectSessionModalCallback(cardId);
  return (
    <ActionButton
      disabled={isMasquerading || !hasAccess || (!canChange || !hasSessions)}
      onClick={openSessionModal}
    >
      {formatMessage(messages.selectSession)}
    </ActionButton>
  );
};
SelectSessionButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default SelectSessionButton;
