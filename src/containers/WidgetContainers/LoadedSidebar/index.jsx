import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import hooks from 'widgets/ProductRecommendations/hooks';

export const WidgetSidebar = ({ setSidebarShowing }) => {
  const { inRecommendationsVariant, isExperimentActive } = hooks.useShowRecommendationsFooter();

  if (!inRecommendationsVariant && isExperimentActive) {
    setSidebarShowing(true);

    return (
      <div className="widget-sidebar">
        <div className="d-flex flex-column">
          <PluginSlot id="widget_sidebar_plugin_slot" />
        </div>
      </div>
    );
  }

  return null;
};

WidgetSidebar.propTypes = {
  setSidebarShowing: PropTypes.func.isRequired,
};

export default WidgetSidebar;
