import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import ProgressSummaryWidget from 'plugins/ProgressSummaryWidget';
import CourseCompletionWidget from 'plugins/CourseCompletionWidget';
import QuickNavigationWidget from 'plugins/QuickNavigationWidget';

export const WidgetSidebarSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
    idAliases={['widget_sidebar_slot']}
  >
    <ProgressSummaryWidget />
    <CourseCompletionWidget />
    <QuickNavigationWidget />
  </PluginSlot>
);

export default WidgetSidebarSlot;