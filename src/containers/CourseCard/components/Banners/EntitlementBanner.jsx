import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectors } from 'data/redux';

import Banner from 'components/Banner';

const { cardData } = selectors;

export const EntitlementBanner = ({ courseNumber }) => {
  const cardValue = (sel) => useSelector(cardData.cardSelector(sel, courseNumber));
  const isEntitlement = cardValue(cardData.isEntitlement);
  if (!isEntitlement) {
    return null;
  }
  const isExpired = cardValue(cardData.isEntitlementExpired);
  const isFulfilled = cardValue(cardData.isEntitlementFulfilled);
  if (isExpired || isFulfilled) {
    return null;
  }
  const canChange = cardValue(cardData.canChangeEntitlementSession);
  return canChange
    ? (<Banner>You must select a session to access the course.</Banner>)
    : (<Banner>The deadline to select a session has passed</Banner>);
};
EntitlementBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default EntitlementBanner;
