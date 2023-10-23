import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import Banner from 'components/Banner';

import { MailtoLink } from '@edx/paragon';
import hooks from './hooks';
import messages from './messages';

export const CreditBanner = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const hookData = hooks.useCreditBannerData(cardId);
  if (hookData === null) {
    return null;
  }

  const { ContentComponent, error, supportEmail } = hookData;
  const supportEmailLink = (<MailtoLink to={supportEmail}>{supportEmail}</MailtoLink>);
  return (
    <Banner {...(error && { variant: 'danger' })}>
      {error && (
        <p className="credit-error-msg">
          {supportEmail ? formatMessage(messages.error, { supportEmailLink }) : formatMessage(messages.errorNoEmail)}
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
