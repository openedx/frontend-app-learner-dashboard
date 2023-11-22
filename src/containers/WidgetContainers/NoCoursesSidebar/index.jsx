import React from 'react';
import PropTypes from 'prop-types';

// import RecommendationsPanel from 'widgets/RecommendationsPanel';
import hooks from 'widgets/ProductRecommendations/hooks';
import PluginSlot from '../../../../plugins/PluginSlot';

export const WidgetSidebar = ({ setSidebarShowing }) => {
  const { inRecommendationsVariant, isExperimentActive } = hooks.useShowRecommendationsFooter();

  if (!inRecommendationsVariant && isExperimentActive) {
    setSidebarShowing(true);

    return (
      <div className="widget-sidebar px-2">
        <div className="d-flex">
          {/* <RecommendationsPanel /> */}
          <PluginSlot
            id="example" // this is how PluginSlot knows which set of plugin URLs to grab from JS config
            className="d-flex flex-column"
            pluginProps={{
              className: 'flex-grow-1',
              title: 'example plugins',
            }}
            style={{
              height: 800,
              width: '100%',
            }}
          >
            <div key="default">This is default plugin content.</div>
          </PluginSlot>
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
