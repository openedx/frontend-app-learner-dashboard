import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import hooks from 'widgets/ProductRecommendations/hooks';

// eslint-disable-next-line arrow-body-style
export const WidgetSidebar = ({ setSidebarShowing }) => {
  // const { inRecommendationsVariant, isExperimentActive } = hooks.useShowRecommendationsFooter();

  return (
    <div className="widget-sidebar">
      <div className="d-flex flex-column">
        <PluginSlot id="widget_sidebar_plugin_slot" />
      </div>
    </div>
  );
};

WidgetSidebar.propTypes = {
  setSidebarShowing: PropTypes.func.isRequired,
};

export default WidgetSidebar;
