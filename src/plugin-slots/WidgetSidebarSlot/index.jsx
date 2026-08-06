import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import ProgressSummaryWidget from 'plugins/ProgressSummaryWidget';
import CourseCompletionWidget from 'plugins/CourseCompletionWidget';
import QuickNavigationWidget from 'plugins/QuickNavigationWidget';
import NewsAnnouncementsWidget from 'plugins/NewsAnnouncementsWidget';

// eslint-disable-next-line arrow-body-style
export const WidgetSidebarSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
    idAliases={['widget_sidebar_slot']}
  >
    <ProgressSummaryWidget />
    <CourseCompletionWidget />
    <QuickNavigationWidget />
    <NewsAnnouncementsWidget />
  </PluginSlot>
);

export default WidgetSidebarSlot;
