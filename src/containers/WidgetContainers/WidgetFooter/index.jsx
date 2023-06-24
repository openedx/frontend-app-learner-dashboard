import React from 'react';

import ProductRecommendations from 'widgets/ProductRecommendations';
import hooks from 'widgets/ProductRecommendations/hooks';

export const WidgetFooter = () => {
  const { shouldShowFooter, shouldLoadFooter } = hooks.useShowRecommendationsFooter();

  if (shouldShowFooter && shouldLoadFooter) {
    return (
      <div className="widget-footer">
        <ProductRecommendations />
      </div>
    );
  }

  return null;
};

export default WidgetFooter;
