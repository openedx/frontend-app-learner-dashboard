import classNames from 'classnames';
import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { reduxHooks } from 'hooks';

// eslint-disable-next-line arrow-body-style
export const WidgetSidebar = () => {
  const hasCourses = reduxHooks.useHasCourses();

  const widgetSidebarClassNames = classNames('widget-sidebar', { 'px-2': !hasCourses });
  const innerWrapperClassNames = classNames('d-flex', { 'flex-column': hasCourses });

  return (
    <div className={widgetSidebarClassNames}>
      <div className={innerWrapperClassNames}>
        <PluginSlot id="widget_sidebar_plugin_slot" />
      </div>
    </div>
  );
};

export default WidgetSidebar;
