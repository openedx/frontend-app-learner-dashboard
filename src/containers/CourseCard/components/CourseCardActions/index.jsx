import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow } from '@edx/paragon';

import { reduxHooks } from 'hooks';

import UpgradeButton from './UpgradeButton';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';
import useActionDisabledState from '../hooks';

export const CourseCardActions = ({ cardId }) => {
  const { isEntitlement, isFulfilled } = reduxHooks.useCardEntitlementData(cardId);
  const { isVerified, hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const { isArchived } = reduxHooks.useCardCourseRunData(cardId);
  const { isExecutiveEd2uCourse } = useActionDisabledState(cardId);

  let PrimaryButton;
  if (isEntitlement) {
    PrimaryButton = isFulfilled ? ViewCourseButton : SelectSessionButton;
  } else if (isArchived) {
    PrimaryButton = ViewCourseButton;
  } else {
    PrimaryButton = hasStarted ? ResumeButton : BeginCourseButton;
  }

  return (
    <ActionRow data-test-id="CourseCardActions">
      {(!(isEntitlement || isVerified) && !isExecutiveEd2uCourse) && <UpgradeButton cardId={cardId} />}
      <PrimaryButton cardId={cardId} />
    </ActionRow>
  );
};
CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActions;
