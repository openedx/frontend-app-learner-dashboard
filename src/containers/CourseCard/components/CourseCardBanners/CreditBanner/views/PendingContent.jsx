import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import CreditContent from './components/CreditContent';
import messages from './messages';
import hooks from './hooks';

export const PendingContent = ({ cardId }) => {
  const { providerName } = appHooks.useCardCreditData(cardId);
  const { formatMessage } = useIntl();
  const { requestData, createCreditRequest } = hooks.useCreditRequestData(cardId);
  return (
    <>
      <CreditContent
        action={{
          onClick: createCreditRequest,
          message: formatMessage(messages.viewDetails),
        }}
        message={formatMessage(messages.received, { providerName })}
        requestData={requestData}
      />
    </>
  );
};
PendingContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default PendingContent;
