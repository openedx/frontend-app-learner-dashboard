import React from 'react';
import './index.scss';
import {
  getAuthenticatedUser,
} from '@edx/frontend-platform/auth';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { activateProductRecommendationsExperiment } from './optimizelyExperiment';
import { useProductRecommendationsData } from './hooks';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';

const ProductRecommendations = () => {
  const { productRecommendations, isLoading, isLoaded } = useProductRecommendationsData();
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;
  console.log('result of call: ', activateProductRecommendationsExperiment('ouhbasdfasdf'));
  console.log(`User ID Hopefully: ${getAuthenticatedUser().userId.toString()}`);

  if (isLoading && !isMobile) {
    return <LoadingView />;
  }

  if (isLoaded && !isMobile) {
    return (
      <LoadedView
        openCourses={productRecommendations.amplitudeCourses}
        crossProductCourses={productRecommendations.crossProductCourses || []}
      />
    );
  }

  return null;
};

export default ProductRecommendations;
