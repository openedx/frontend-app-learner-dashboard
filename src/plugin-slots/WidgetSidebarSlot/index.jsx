import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';

// eslint-disable-next-line arrow-body-style
export const WidgetSidebarSlot = () => (
  <PluginSlot id="widget_sidebar_slot">
    <LookingForChallengeWidget />
  </PluginSlot>
);

export default WidgetSidebarSlot;
