import React from 'react';

import InterviewWidget from 'widgets/InterviewWidget';
import RecommendationsPanel from 'widgets/RecommendationsPanel';

export const WidgetSidebar = () => (
  <div className="widget-sidebar">
    <div className="d-flex">
      <InterviewWidget />
    </div>
    <div className="d-flex">
      <RecommendationsPanel />
    </div>
  </div>
);

export default WidgetSidebar;
