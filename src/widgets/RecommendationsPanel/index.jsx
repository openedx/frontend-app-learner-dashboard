import React from 'react';

import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';
import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import hooks from './hooks';
import { useRecommendationsModal } from '../../components/ModalView/hooks';

export const RecommendationsPanel = () => {
  const {
    courses,
    isControl,
    isFailed,
    isLoaded,
    isLoading,
  } = hooks.useRecommendationPanelData();

  const { isRecommendationsModalOpen, toggleRecommendationsModal } = useRecommendationsModal();

  if (isLoading) {
    return (<LoadingView />);
  }
  if (isLoaded && courses.length > 0) {
    return (
      <LoadedView
        courses={courses}
        isControl={isControl}
        setIsRecommendationsModalOpen={toggleRecommendationsModal}
        isRecommendationsModalOpen={isRecommendationsModalOpen}
      />
    );
  }
  if (isFailed) {
    return (<LookingForChallengeWidget />);
  }
  // default fallback
  return (<LookingForChallengeWidget />);
};

export default RecommendationsPanel;
