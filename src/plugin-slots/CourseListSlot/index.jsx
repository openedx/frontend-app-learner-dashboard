import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import CourseList from 'containers/CoursesPanel/CourseList';

export const CourseListSlot = () => (
  <PluginSlot id="course_list_slot">
    <CourseList />
  </PluginSlot>
);
export default CourseListSlot;
