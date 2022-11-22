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
    handleFindCoursesClicked,
    handleRecommendedCourseClicked,
  } = hooks.useRecommendationPanelData();

  if (isLoading) {
    return (<LoadingView />);
  }
  if (isLoaded) {
    return (
      <LoadedView
        courses={courses}
        {...{ handleFindCoursesClicked, handleRecommendedCourseClicked }}
      />
    );
  }
  if (isFailed) {
    return (<LookingForChallengeWidget {...{ handleFindCoursesClicked }} />);
  }
  // default fallback
  return (<LookingForChallengeWidget {...{ handleFindCoursesClicked }} />);
};

export default RecommendationsPanel;
