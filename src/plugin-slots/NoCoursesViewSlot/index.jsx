import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import NoCoursesView from 'containers/CoursesPanel/NoCoursesView';

export const NoCoursesViewSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.no_courses_view.v1"
    idAliases={['no_courses_view_slot']}
  >
    <NoCoursesView />
  </PluginSlot>
);

export default NoCoursesViewSlot;
