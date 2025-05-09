import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

const CourseCardActionSlot = ({ cardId }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_card_action.v1"
    idAliases={['course_card_action_slot']}
    pluginProps={{
      cardId,
    }}
  />
);

CourseCardActionSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActionSlot;
