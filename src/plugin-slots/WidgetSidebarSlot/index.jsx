import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
<<<<<<< Updated upstream
import LookingForChallengeWidget from 'plugins/LookingForChallengeWidget';
=======
import ProgressSummaryWidget from 'plugins/ProgressSummaryWidget';
import CourseCompletionWidget from 'plugins/CourseCompletionWidget';
import QuickNavigationWidget from 'plugins/QuickNavigationWidget';
import NewsAnnouncementsWidget from 'plugins/NewsAnnouncementsWidget';
>>>>>>> Stashed changes

// eslint-disable-next-line arrow-body-style
export const WidgetSidebarSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
    idAliases={['widget_sidebar_slot']}
  >
<<<<<<< Updated upstream
    <LookingForChallengeWidget />
=======
    <ProgressSummaryWidget />
    <CourseCompletionWidget />
    <QuickNavigationWidget />
    <NewsAnnouncementsWidget />
>>>>>>> Stashed changes
  </PluginSlot>
);

export default WidgetSidebarSlot;
