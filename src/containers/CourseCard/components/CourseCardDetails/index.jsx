import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@openedx/paragon';

import useCardDetailsData from './hooks';
// import './index.scss';

export const CourseCardDetails = ({ cardId }) => {
  const {
    providerName,
    accessMessage,
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    courseNumber,
    changeOrLeaveSessionMessage,
  } = useCardDetailsData({ cardId });

  return (
    <span className="small" data-testid="CourseCardDetails">
      {providerName} • {courseNumber}
      {!(isEntitlement && !isFulfilled) && accessMessage && (
        ` • ${accessMessage}`
      )}
      {isEntitlement && isFulfilled && canChange ? (
        <>
          {' • '}
          <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
            {changeOrLeaveSessionMessage}
          </Button>
        </>
      ) : null}
    </span>
  );
};

CourseCardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardDetails.defaultProps = {};

export default CourseCardDetails;
