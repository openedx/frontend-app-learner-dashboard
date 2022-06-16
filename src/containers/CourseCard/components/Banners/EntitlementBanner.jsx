import React from 'react';
import PropTypes from 'prop-types';

import { useCardValues } from 'hooks';
import { selectors } from 'data/redux';

import Banner from 'components/Banner';

const { cardData } = selectors;

export const EntitlementBanner = ({ courseNumber }) => {
  const data = useCardValues(courseNumber, {
    canChange: cardData.canChangeEntitlementSession,
    isEntitlement: cardData.isEntitlement,
    isExpired: cardData.isEntitlementExpired,
    isFulfilled: cardData.isEntitlementFulfilled,
  });

  if (!data.isEntitlement) {
    return null;
  }
  if (data.isExpired || data.isFulfilled) {
    return null;
  }
  return data.canChange
    ? (<Banner>You must select a session to access the course.</Banner>)
    : (<Banner>The deadline to select a session has passed</Banner>);
};
EntitlementBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default EntitlementBanner;
