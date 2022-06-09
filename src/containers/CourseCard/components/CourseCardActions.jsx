import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Button } from '@edx/paragon';
import { Locked } from '@edx/paragon/icons';

import { selectors } from 'data/redux';

const { cardData } = selectors;

export const CourseCardActions = ({ courseNumber }) => {
  const cardValue = (sel) => useSelector(cardData.cardSelector(sel, courseNumber));
  const canUpgrade = cardValue(cardData.canUpgrade);
  const isAudit = cardValue(cardData.isAudit);
  const isAuditAccessExpired = cardValue(cardData.isAuditAccessExpired);
  const isVerified = cardValue(cardData.isVerified);
  const isPending = cardValue(cardData.isCourseRunPending);
  const isFinished = cardValue(cardData.isCourseRunFinished);

  let primary;
  let secondary = null;
  if (!isVerified) {
    secondary = (
      <Button
        iconBefore={Locked}
        variant="outline-primary"
        disabled={!canUpgrade}
      >
        Upgrade
      </Button>
    );
  }

  if (isPending) {
    primary = (<Button>Begin Course</Button>);
  } else if (!isFinished) {
    primary = (isAudit && isAuditAccessExpired)
      ? (<Button disabled>Resume</Button>)
      : (<Button>Resume</Button>);
  } else {
    primary = (<Button>View Course</Button>);
  }
  return (<>{secondary}{primary}</>);
};
CourseCardActions.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseCardActions;
