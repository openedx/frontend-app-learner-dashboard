import React from 'react';

import RecommendationsPanel from 'widgets/RecommendationsPanel';

export const WidgetSidebar = () => (
  <div className="widget-sidebar px-2">
    <div className="d-flex">
      <RecommendationsPanel />
    </div>
  </div>
);

export default WidgetSidebar;
