import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

const CourseCardActionSlot = ({ cardId }) => (
  <PluginSlot
    id="course_card_action_slot"
    pluginProps={{
      cardId,
    }}
  />
);

CourseCardActionSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActionSlot;
