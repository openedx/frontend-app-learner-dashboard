import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Button } from '@edx/paragon';

import useCardDetailsData from './hooks';

export const CourseCardDetails = ({ cardId }) => {
  const dispatch = useDispatch();
  const {
    providerName,
    accessMessage,
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    courseNumber,
    changeOrLeaveSessionMessage,
  } = useCardDetailsData({ cardId, dispatch });

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
