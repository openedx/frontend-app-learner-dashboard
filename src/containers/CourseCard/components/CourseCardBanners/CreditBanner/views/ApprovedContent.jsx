import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';

import messages from './messages';

export const ApprovedContent = ({ cardId }) => {
  const { providerStatusUrl: href, providerName } = appHooks.useCardCreditData(cardId);
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      action={{ href, message: formatMessage(messages.viewCredit) }}
      message={formatMessage(
        messages.approved,
        {
          congratulations: <b>{formatMessage(messages.congratulations)}</b>,
          linkToProviderSite: <ProviderLink cardId={cardId} />,
          providerName,
        },
      )}
    />
  );
};
ApprovedContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ApprovedContent;
