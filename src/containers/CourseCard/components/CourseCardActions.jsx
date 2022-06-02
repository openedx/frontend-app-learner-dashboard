import React from 'react';

import { Button } from '@edx/paragon';
import { Locked } from '@edx/paragon/icons';

import shapes from 'data/services/lms/shapes';

export const CourseCardActions = ({ cardData: { enrollment, courseRun } }) => {
  let primary;
  let secondary = null;
  if (!enrollment.isVerified) {
    secondary = (
      <Button
        iconBefore={Locked}
        variant="outline-primary"
        disabled={!enrollment.canUpgrade}
      >
        Upgrade
      </Button>
    );
  }
  if (courseRun.isPending) {
    primary = (
      <Button>
        Begin Course
      </Button>
    );
  } else if (!courseRun.isEnded) {
    if (enrollment.isAudit && enrollment.isAuditAccessExpired) {
      primary = (<Button disabled>Resume</Button>);
    } else {
      primary = (<Button>Resume</Button>);
    }
  } else {
    primary = (<Button>View Course</Button>);
  }
  return (<>{secondary}{primary}</>);
};
CourseCardActions.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

export default CourseCardActions;
