import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks } from 'data/redux';
import messages from './messages';

export const SelectSessionButton = ({ cardId }) => {
  const { hasAccess } = hooks.useCardEnrollmentData(cardId);
  const { canChange, hasSessions } = hooks.useCardEntitlementData(cardId);
  const { isMasquerading } = hooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const openSessionModal = hooks.useUpdateSelectSessionModalCallback(dispatch, cardId);
  return (
    <Button
      disabled={isMasquerading || !hasAccess || (!canChange || !hasSessions)}
      onClick={openSessionModal}
    >
      {formatMessage(messages.selectSession)}
    </Button>
  );
};
SelectSessionButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default SelectSessionButton;
