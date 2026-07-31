import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { PlayArrow } from '@openedx/paragon/icons';
import { EXECUTIVE_EDUCATION_COURSE_MODES } from 'data/constants/course';

import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import { useInitializeLearnerHome } from 'data/hooks';
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
      href="#"
      onClick={handleClick}
      variant="success"
      iconBefore={PlayArrow}
      className="course-card-cta-button w-100"
    >
      {formatMessage(messages.beginCourse)}
    </ActionButton>
  );
};
BeginCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default BeginCourseButton;
