import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const SelectSessionButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { hasAccess } = reduxHooks.useCardEnrollmentData(cardId);
  const { canChange, hasSessions } = reduxHooks.useCardEntitlementData(cardId);
  const openSessionModal = reduxHooks.useUpdateSelectSessionModalCallback(cardId);
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
