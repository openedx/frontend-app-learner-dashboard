import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@openedx/frontend-base';
import { EXECUTIVE_EDUCATION_COURSE_MODES } from '@src/data/constants/course';

import track from '@src/tracking';
import { useCourseData, useCourseTrackingEvent } from '@src/hooks';
import { useInitializeLearnerHome } from '@src/data/hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const BeginCourseButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { data: learnerData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const homeUrl = courseData?.courseRun?.homeUrl;
  const execEdTrackingParam = useMemo(() => {
    const isExecEd2UCourse = EXECUTIVE_EDUCATION_COURSE_MODES.includes(courseData.enrollment.mode);
    const { authOrgId } = learnerData.enterpriseDashboard || {};
    return isExecEd2UCourse ? `?org_id=${authOrgId}` : '';
  }, [courseData.enrollment.mode, learnerData.enterpriseDashboard]);
  const { disableBeginCourse } = useActionDisabledState(cardId);

  const handleClick = useCourseTrackingEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl + execEdTrackingParam,
  );
  return (
    <ActionButton
      disabled={disableBeginCourse}
      as="a"
      href={homeUrl + execEdTrackingParam}
      onClick={handleClick}
    >
      {formatMessage(messages.beginCourse)}
    </ActionButton>
  );
};
BeginCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default BeginCourseButton;
