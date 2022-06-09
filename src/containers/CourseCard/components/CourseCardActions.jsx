import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { Locked } from '@edx/paragon/icons';

import { selectors } from 'data/redux';
import { getCardValues } from 'hooks';

const { cardData } = selectors;

export const CourseCardActions = ({ courseNumber }) => {
  const {
    canUpgrade,
    isAudit,
    isAuditAccessExpired,
    isVerified,
    isPending,
    isFinished,
  } = getCardValues(courseNumber, {
    canUpgrade: cardData.canUpgrade,
    isAudit: cardData.isAudit,
    isAuditAccessExpired: cardData.isAuditAccessExpired,
    isVerified: cardData.isVerified,
    isPending: cardData.isCourseRunPending,
    isFinished: cardData.isCourseRunFinished,
  });

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
