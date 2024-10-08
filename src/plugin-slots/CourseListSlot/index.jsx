import React from 'react';
import PropTypes from 'prop-types';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { CourseList } from 'containers/CoursesPanel/CourseList';

export const CourseListSlot = ({ courseListData }) => (
  <PluginSlot id="course_list_slot" pluginProps={{ courseListData }}>
    <CourseList courseListData={courseListData} />
  </PluginSlot>
);

CourseListSlot.propTypes = {
  courseListData: PropTypes.shape().isRequired,
};

export default CourseListSlot;
