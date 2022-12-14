import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import track from 'tracking';

import CreditContent from './components/CreditContent';
import messages from './messages';

export const EligibleContent = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { providerName, creditPurchaseUrl: href } = appHooks.useCardCreditData(cardId);
  const { courseId } = appHooks.useCardCourseRunData(cardId);

  const onClick = track.credit.purchase(courseId, href);
  const getCredit = formatMessage(messages.getCredit);
  const message = providerName
    ? formatMessage(messages.eligibleFromProvider, { providerName })
    : formatMessage(messages.eligible, { getCredit: (<b>{getCredit}</b>) });

  return (
    <CreditContent
      action={{ onClick, message: getCredit }}
      message={message}
    />
  );
};
EligibleContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default EligibleContent;
