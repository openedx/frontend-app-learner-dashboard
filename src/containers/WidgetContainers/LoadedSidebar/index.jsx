import React from 'react';

import RecommendationsPanel from 'widgets/RecommendationsPanel';
import hooks from 'widgets/ProductRecommendations/hooks';

export const WidgetSidebar = () => {
  const { shouldShowFooter } = hooks.useShowRecommendationsFooter();

  if (!shouldShowFooter) {
    return (
      <div className="widget-sidebar">
        <div className="d-flex">
          <RecommendationsPanel />
        </div>
      </div>
    );
  }

  return null;
};

export default WidgetSidebar;
