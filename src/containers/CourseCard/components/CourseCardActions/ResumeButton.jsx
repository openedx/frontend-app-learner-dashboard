import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { EXECUTIVE_EDUCATION_COURSE_MODES } from 'data/constants/course';
import track from 'tracking';
import { useCourseTrackingEvent, useCourseData } from 'hooks';
import { useInitializeLearnerHome } from 'data/hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const ResumeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { data: learnerData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const resumeUrl = courseData?.courseRun?.resumeUrl;
  const execEdTrackingParam = useMemo(() => {
    const isExecEd2UCourse = EXECUTIVE_EDUCATION_COURSE_MODES.includes(courseData.enrollment.mode);
    const { authOrgId } = learnerData.enterpriseDashboard || {};
    return isExecEd2UCourse ? `?org_id=${authOrgId}` : '';
  }, [courseData.enrollment.mode, learnerData.enterpriseDashboard]);
  const { disableResumeCourse } = useActionDisabledState(cardId);

  const handleClick = useCourseTrackingEvent(
    track.course.enterCourseClicked,
    cardId,
    resumeUrl + execEdTrackingParam,
  );
  return (
    <ActionButton
      disabled={disableResumeCourse}
      as="a"
      href="#"
      onClick={handleClick}
    >
      {formatMessage(messages.resume)}
    </ActionButton>
  );
};
ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ResumeButton;
