import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import CreditContent from './components/CreditContent';
import messages from './messages';
import hooks from './hooks';

export const PendingContent = ({ cardId }) => {
  const { providerName } = reduxHooks.useCardCreditData(cardId);
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
