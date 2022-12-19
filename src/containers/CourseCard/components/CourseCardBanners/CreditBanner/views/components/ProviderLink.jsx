/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { hooks as appHooks } from 'data/redux';
import { Hyperlink } from '@edx/paragon';

export const ProviderLink = ({ cardId }) => {
  const credit = appHooks.useCardCreditData(cardId);
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
