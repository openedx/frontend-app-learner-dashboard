import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow } from '@openedx/paragon';

import { reduxHooks } from 'hooks';

import UpgradeButton from './UpgradeButton';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';

export const CourseCardActions = ({ cardId }) => {
  const { isEntitlement, isFulfilled } = reduxHooks.useCardEntitlementData(cardId);
  const {
    isVerified,
    hasStarted,
    isExecEd2UCourse,
  } = reduxHooks.useCardEnrollmentData(cardId);
  const { isArchived } = reduxHooks.useCardCourseRunData(cardId);

  return (
    <ActionRow data-test-id="CourseCardActions">
      {!(isEntitlement || isVerified || isExecEd2UCourse) && <UpgradeButton cardId={cardId} />}
      {isEntitlement && (isFulfilled
        ? <ViewCourseButton cardId={cardId} />
        : <SelectSessionButton cardId={cardId} />
      )}
      {(isArchived && !isEntitlement) && (
        <ViewCourseButton cardId={cardId} />
      )}
      {!(isArchived || isEntitlement) && (hasStarted
        ? <ResumeButton cardId={cardId} />
        : <BeginCourseButton cardId={cardId} />
      )}
    </ActionRow>
  );
};
CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActions;
