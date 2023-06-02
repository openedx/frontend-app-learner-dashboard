import React from 'react';
import './index.scss';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { useProductRecommendationsData } from './hooks';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';

const ProductRecommendations = () => {
  const {
    productRecommendations,
    isLoading,
    isLoaded,
    hasFailed,
  } = useProductRecommendationsData();

  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;

  if (isLoading && !isMobile && !hasFailed) {
    return <LoadingView />;
  }

  if (isLoaded && !isMobile && !hasFailed) {
    return (
      <LoadedView
        openCourses={productRecommendations.amplitudeCourses}
        crossProductCourses={productRecommendations.crossProductCourses}
      />
    );
  }

  return null;
};

export default ProductRecommendations;
