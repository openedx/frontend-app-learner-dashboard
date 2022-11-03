import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import messages from './messages';

export const SelectSessionButton = ({ cardId, isSmall }) => {
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { canChange, hasSessions } = hooks.useCardEntitlementData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  const openSessionModal = hooks.useUpdateSelectSessionModalCallback(cardId);
  return (
    <Button
      disabled={isMasquerading || !hasAccess || (!canChange || !hasSessions)}
      onClick={openSessionModal}
      {...isSmall && { size: 'sm' }}
    >
      {formatMessage(messages.selectSession)}
    </Button>
  );
};
SelectSessionButton.propTypes = {
  cardId: PropTypes.string.isRequired,
  isSmall: PropTypes.bool.isRequired,
};
export default SelectSessionButton;
