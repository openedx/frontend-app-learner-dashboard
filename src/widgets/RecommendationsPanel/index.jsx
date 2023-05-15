import React from 'react';

import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';
import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import hooks from './hooks';
import recommendedCoursesData from "../RecommendationsPanel/mockData";

export const RecommendationsPanel = () => {
  const {
    courses,
    isControl,
    isFailed,
    isLoaded,
    isLoading,
  } = hooks.useRecommendationPanelData();

  if (isLoading) {
    return (<LoadingView />);
  }

  const newCourses = recommendedCoursesData.courses;

  // if (newCourses.length > 0) {
  //   return (
  //     <LoadedView courses={newCourses} isControl={false} />
  //   );
  // }
  // if (isFailed) {
  //   return (<LookingForChallengeWidget />);
  // }
  // default fallback
  return (<LookingForChallengeWidget />);
};

export default RecommendationsPanel;
