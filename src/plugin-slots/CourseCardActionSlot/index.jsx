import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

const CourseCardActionSlot = ({
  cardId,
  completionSummary,
  hasStarted,
  resumeUrl,
}) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_card_action.v1"
    idAliases={['course_card_action_slot']}
    pluginProps={{
      cardId,
      completionSummary,
      hasStarted,
      resumeUrl,
    }}
  />
);

CourseCardActionSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
  completionSummary: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  hasStarted: PropTypes.bool,
  resumeUrl: PropTypes.string,
};

CourseCardActionSlot.defaultProps = {
  completionSummary: 0,
  hasStarted: false,
  resumeUrl: '#',
};

export default CourseCardActionSlot;
