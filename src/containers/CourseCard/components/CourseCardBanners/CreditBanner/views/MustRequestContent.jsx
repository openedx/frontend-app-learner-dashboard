import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@openedx/frontend-base';

import MasqueradeUserContext from '../../../../../../data/contexts/MasqueradeUserContext';
import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';
import hooks from './hooks';

import messages from './messages';

export const MustRequestContent = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { requestData, createCreditRequest } = hooks.useCreditRequestData(cardId);
  const { isMasquerading } = useContext(MasqueradeUserContext);
  return (
    <CreditContent
      action={{
        message: formatMessage(messages.requestCredit),
        onClick: createCreditRequest,
        disabled: isMasquerading,
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
