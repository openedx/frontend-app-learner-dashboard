import React from 'react';

import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';
import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import hooks from './hooks';

export const RecommendationsPanel = () => {
  const {
    courses,
    isFailed,
    isLoaded,
    isLoading,
    courseSearchClickTracker,
  } = hooks.useRecommendationPanelData();

  if (isLoading) {
    return (<LoadingView />);
  }
  if (isLoaded) {
    return (<LoadedView courses={courses} courseSearchClickTracker={courseSearchClickTracker} />);
  }
  if (isFailed) {
    return (<LookingForChallengeWidget courseSearchClickTracker={courseSearchClickTracker} />);
  }
  // default fallback
  return (<LookingForChallengeWidget courseSearchClickTracker={courseSearchClickTracker} />);
};

export default RecommendationsPanel;
