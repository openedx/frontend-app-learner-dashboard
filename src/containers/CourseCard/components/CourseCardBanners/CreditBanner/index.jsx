import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import Banner from 'components/Banner';
import EmailLink from 'components/EmailLink';

import hooks from './hooks';
import messages from './messages';

export const CreditBanner = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const hookData = hooks.useCreditBannerData(cardId);
  if (hookData === null) {
    return null;
  }
  const { ContentComponent, error, supportEmail } = hookData;
  const supportEmailLink = (<EmailLink address={supportEmail} />);
  return (
    <Banner {...(error && { variant: 'danger' })}>
      {error && (
        <p className="credit-error-msg">
          {formatMessage(messages.error, { supportEmailLink })}
        </p>
      )}
      <ContentComponent cardId={cardId} />
    </Banner>
  );
};
CreditBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CreditBanner;
