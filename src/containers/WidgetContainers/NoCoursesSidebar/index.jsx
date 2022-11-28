import React from 'react';

import { features } from 'config';
import RecommendationsPanel from 'widgets/RecommendationsPanel';
import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';

export const WidgetSidebar = () => (
  <div className="widget-sidebar px-2">
    <div className="d-flex">
      {features.ENABLE_RECOMMENDATIONS_PANEL ? <RecommendationsPanel /> : <LookingForChallengeWidget />}
    </div>
  </div>
);

export default WidgetSidebar;
