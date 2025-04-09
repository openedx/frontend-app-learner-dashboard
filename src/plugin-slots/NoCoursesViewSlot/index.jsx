import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import NoCoursesView from '@src/containers/CoursesPanel/NoCoursesView';

export const NoCoursesViewSlot = () => (
  <PluginSlot id="no_courses_view_slot">
    <NoCoursesView />
  </PluginSlot>
);

export default NoCoursesViewSlot;
