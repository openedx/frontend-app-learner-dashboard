import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import CreditContent from './components/CreditContent';
import messages from './messages';

export const PendingContent = ({ cardId }) => {
  const { providerStatusUrl: href, providerName } = reduxHooks.useCardCreditData(cardId);
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      action={{
        href,
        message: formatMessage(messages.viewDetails),
        disabled: isMasquerading,
      }}
      message={formatMessage(messages.received, { providerName })}
    />
  );
};
PendingContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default PendingContent;
