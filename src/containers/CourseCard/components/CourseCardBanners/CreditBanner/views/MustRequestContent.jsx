import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';
import hooks from './hooks';

import messages from './messages';

export const MustRequestContent = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { requestData, createCreditRequest } = hooks.useCreditRequestData(cardId);
  return (
    <CreditContent
      action={{
        message: formatMessage(messages.requestCredit),
        onClick: createCreditRequest,
      }}
      message={formatMessage(messages.mustRequest, {
        linkToProviderSite: (<ProviderLink cardId={cardId} />),
        requestCredit: (<b>{formatMessage(messages.requestCredit)}</b>),
      })}
      requestData={requestData}
    />
  );
};
MustRequestContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default MustRequestContent;
