import React from 'react';
import { Hyperlink } from '@edx/paragon';

import shapes from 'data/services/lms/shapes';

import Banner from 'components/Banner';

export const EntitlementBanner = ({ cardData }) => {
  const { entitlements } = cardData;
  if (!entitlements.isEntitlement) {
    return null;
  }
  if (entitlements.isExpired) {
    return null;
  }
  if (!entitlements.isFulfilled) {
    if (entitlements.canChange) {
      return (
        <Banner>You must select a session to access the course.</Banner>
      );
    }
    return (
      <Banner>The deadline to select a session has passed</Banner>
    );
  }
  if (entitlements.canChange) {
    return (
      <Banner>
        You can change sessions until {entitlements.changeDeadline}.
        {'  '}
        <Hyperlink>Change or leave session</Hyperlink>
      </Banner>
    );
  }

  return null;
};
EntitlementBanner.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

export default EntitlementBanner;
