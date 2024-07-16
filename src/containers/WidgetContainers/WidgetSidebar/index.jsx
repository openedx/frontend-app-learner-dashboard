import React from 'react';

import { reduxHooks } from 'hooks';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

// TODO: is this the same as NoCoursesSidebar?

// eslint-disable-next-line arrow-body-style
export const WidgetSidebar = () => {
  const hasCourses = reduxHooks.useHasCourses();

  const widgetSidebarClassNames = `widget-sidebar ${hasCourses ? '' : 'px-2'}`;
  const innerWrapperClassNames = `d-flex ${hasCourses ? 'flex-column' : ''}`;

  return (
    <div className={widgetSidebarClassNames}>
      <div className={innerWrapperClassNames}>
        <PluginSlot id="widget_sidebar_plugin_slot" />
      </div>
    </div>
  );
};

export default WidgetSidebar;
