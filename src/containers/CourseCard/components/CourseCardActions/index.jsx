import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow } from '@openedx/paragon';

import { useCourseData } from 'hooks';

import CourseCardActionSlot from 'plugin-slots/CourseCardActionSlot';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';
import { useEntitlementInfo } from '../hooks';

export const CourseCardActions = ({ cardId }) => {
  const cardData = useCourseData(cardId);
  const hasStarted = cardData.enrollment.hasStarted || false;
  const { isEntitlement, isFulfilled } = useEntitlementInfo(cardData);
  const isArchived = cardData.courseRun.isArchived || false;

  return (
    <ActionRow data-test-id="CourseCardActions">
      <CourseCardActionSlot cardId={cardId} />
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
