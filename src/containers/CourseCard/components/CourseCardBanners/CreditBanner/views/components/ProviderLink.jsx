/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { reduxHooks } from '@src/hooks';
import { Hyperlink } from '@openedx/paragon';

export const ProviderLink = ({ cardId }) => {
  const credit = reduxHooks.useCardCreditData(cardId);
  return (
    <Hyperlink
      href={credit.providerStatusUrl}
      rel="noopener"
      target="_blank"
    >
      {credit.providerName}
    </Hyperlink>
  );
};
ProviderLink.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ProviderLink;
