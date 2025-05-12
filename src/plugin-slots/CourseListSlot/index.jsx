import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { CourseList, courseListDataShape } from 'containers/CoursesPanel/CourseList';

export const CourseListSlot = ({ courseListData }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_list.v1"
    idAliases={['course_list_slot']}
    pluginProps={{ courseListData }}
  >
    <CourseList courseListData={courseListData} />
  </PluginSlot>
);

CourseListSlot.propTypes = {
  courseListData: courseListDataShape,
};

export default CourseListSlot;
