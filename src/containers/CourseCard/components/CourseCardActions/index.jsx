import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow } from '@edx/paragon';

import { reduxHooks } from 'hooks';

import { EXECUTIVE_EDUCATION_2U } from '../../constants';

import UpgradeButton from './UpgradeButton';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';

export const CourseCardActions = ({ cardId }) => {
  const { type } = reduxHooks.useCardCourseData(cardId);
  const { isEntitlement, isFulfilled } = reduxHooks.useCardEntitlementData(cardId);
  const { isVerified, hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const { isArchived } = reduxHooks.useCardCourseRunData(cardId);
  let PrimaryButton;
  if (isEntitlement) {
    PrimaryButton = isFulfilled ? ViewCourseButton : SelectSessionButton;
  } else if (isArchived) {
    PrimaryButton = ViewCourseButton;
  } else {
    PrimaryButton = hasStarted ? ResumeButton : BeginCourseButton;
  }

  const isExecutiveEducation2U = type === EXECUTIVE_EDUCATION_2U;

  return (
    <ActionRow data-test-id="CourseCardActions">
      {!(isEntitlement || isVerified) && !isExecutiveEducation2U
      && <UpgradeButton cardId={cardId} />}
      <PrimaryButton cardId={cardId} />
    </ActionRow>
  );
};
CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActions;
