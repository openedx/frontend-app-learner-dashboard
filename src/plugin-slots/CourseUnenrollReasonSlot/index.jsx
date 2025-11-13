import React from 'react'
import PropTypes from 'prop-types';

import { PluginSlot } from '@openedx/frontend-plugin-framework'
import ReasonPane, { reasonShape } from 'containers/UnenrollConfirmModal/components/ReasonPane'

const CourseUnenrollReasonSlot = ({ reason, close }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_unenroll.v1"
    idAliases={["course_unenroll_slot"]}
    pluginProps={{ reason, close }}
  >
    <ReasonPane reason={reason} handleClose={close} />
  </PluginSlot>
);

CourseUnenrollReasonSlot.propTypes = {
  reason: reasonShape.isRequired,
  close: PropTypes.func.isRequired,
};

export default CourseUnenrollReasonSlot;
