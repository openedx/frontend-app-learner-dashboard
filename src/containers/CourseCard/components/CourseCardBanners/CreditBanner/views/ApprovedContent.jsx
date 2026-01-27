import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useIntl } from '@openedx/frontend-base';

import MasqueradeUserContext from '../../../../../../data/contexts/MasqueradeUserContext';
import { reduxHooks } from '../../../../../../hooks';
import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';

import messages from './messages';

export const ApprovedContent = ({ cardId }) => {
  const { providerStatusUrl: href, providerName } = reduxHooks.useCardCreditData(cardId);
  const { isMasquerading } = useContext(MasqueradeUserContext);
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      action={{ href, message: formatMessage(messages.viewCredit), disabled: isMasquerading }}
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
