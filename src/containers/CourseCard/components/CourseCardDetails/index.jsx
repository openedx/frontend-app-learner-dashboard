import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@openedx/paragon';

import useCardDetailsData from './hooks';
import { CardDetails } from 'containers/DashboardCard/CardDetails';

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

  const changeOrLeaveButton = isEntitlement && isFulfilled && canChange ? (
    <>
      {' • '}
      <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
        {changeOrLeaveSessionMessage}
      </Button>
    </>
  ) : null;

  return (
    <CardDetails
      providerName={providerName}
      details={courseNumber}
      showAccessMessage={!(isEntitlement && !isFulfilled)}
      accessMessage={accessMessage}
      actions={changeOrLeaveButton}
      dataTestId="CourseCardDetails"
    />
  );
};

CourseCardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardDetails.defaultProps = {};

export default CourseCardDetails;
