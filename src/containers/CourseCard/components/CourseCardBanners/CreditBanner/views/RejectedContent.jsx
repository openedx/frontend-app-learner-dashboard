import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';
import messages from './messages';

export const RejectedContent = ({ cardId }) => {
  const credit = appHooks.useCardCreditData(cardId);
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      message={formatMessage(messages.rejected, {
        providerName: credit.providerName,
        linkToProviderSite: (<ProviderLink cardId={cardId} />),
      })}
    />
  );
};
RejectedContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default RejectedContent;
