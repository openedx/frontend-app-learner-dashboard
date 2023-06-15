import React from 'react';

import ProductRecommendations from 'widgets/ProductRecommendations';
import hooks from 'widgets/ProductRecommendations/hooks';

export const WidgetFooter = () => {
  const showRecommendationsFooter = hooks.useShowRecommendationsFooter();

  if (showRecommendationsFooter) {
    return (
      <div className="widget-footer">
        <ProductRecommendations />
      </div>
    );
  }

  return null;
};

export default WidgetFooter;
