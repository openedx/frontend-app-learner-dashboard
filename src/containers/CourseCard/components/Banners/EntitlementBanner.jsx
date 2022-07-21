import React from 'react';
import PropTypes from 'prop-types';

import { hooks as appHooks } from 'data/redux';

import Banner from 'components/Banner';

export const EntitlementBanner = ({ courseNumber }) => {
  const {
    canChange,
    isEntitlement,
    isExpired,
    isFulfilled,
  } = appHooks.useCardEntitlementsData(courseNumber);

  if (!isEntitlement) {
    return null;
  }
  if (isExpired || isFulfilled) {
    return null;
  }
  return canChange
    ? (<Banner>You must select a session to access the course.</Banner>)
    : (<Banner>The deadline to select a session has passed</Banner>);
};
EntitlementBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default EntitlementBanner;
