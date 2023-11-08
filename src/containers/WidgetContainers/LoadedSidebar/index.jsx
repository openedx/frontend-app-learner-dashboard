import React from 'react';
import PropTypes from 'prop-types';

// import RecommendationsPanel from 'widgets/RecommendationsPanel';
import hooks from 'widgets/ProductRecommendations/hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PluginSlot } from '@edx/frontend-plugin-framework/src/plugins';

export const WidgetSidebar = ({ setSidebarShowing }) => {
  const { inRecommendationsVariant, isExperimentActive } = hooks.useShowRecommendationsFooter();

  if (!inRecommendationsVariant && isExperimentActive) {
    setSidebarShowing(true);

    return (
      <div className="widget-sidebar">
        <div className="d-flex flex-column">
          {/* <RecommendationsPanel /> */}
          <PluginSlot
            id="example" // this is how PluginSlot knows which set of plugin URLs to grab from JS config
            className="d-flex flex-column"
            pluginProps={{
              className: 'flex-grow-1',
              title: 'example plugins',
            }}
            style={{
              height: 700,
            }}
          />
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
