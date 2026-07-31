import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import ProgressSummaryWidget from 'plugins/ProgressSummaryWidget';
import CourseCompletionWidget from 'plugins/CourseCompletionWidget';

export const WidgetSidebarSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
    idAliases={['widget_sidebar_slot']}
  >
    <ProgressSummaryWidget />
    <CourseCompletionWidget />
  </PluginSlot>
);

export default WidgetSidebarSlot;