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
  } = hooks.useRecommendationPanelData();

  if (isLoading) {
    return (<LoadingView />);
  }
  if (isLoaded) {
    return (<LoadedView courses={courses} />);
  }
  if (isFailed) {
    return (<LookingForChallengeWidget />);
  }
  // default fallback
  return (<LookingForChallengeWidget />);
};

export default RecommendationsPanel;
