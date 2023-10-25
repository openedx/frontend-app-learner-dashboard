import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';

import useCardDetailsData from './hooks';
import './index.scss';

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
    openCertificatePreview,
  } = useCardDetailsData({ cardId });

  return (
    <div>
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
      <Button
        variant="link"
        size="inline"
        className="float-right"
        data-testid="certificate-preview"
        onClick={openCertificatePreview}
      >
        Preview Your Certificate
      </Button>
    </div>
  );
};

CourseCardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardDetails.defaultProps = {};

export default CourseCardDetails;
