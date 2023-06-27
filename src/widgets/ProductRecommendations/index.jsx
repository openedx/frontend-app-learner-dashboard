import React from 'react';
import './index.scss';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { activateProductRecommendationsExperiment } from './optimizelyExperiment';
import { useProductRecommendationsData } from './hooks';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';

const ProductRecommendations = () => {
  const { productRecommendations, isLoading, isLoaded } = useProductRecommendationsData();
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;
  const userID = getAuthenticatedUser().userId.toString();
  const userAttributes = {
    is_mobile_user: isMobile,
    lang_preference: global.navigator.languages.join(' '),
    is_enterprise_user: false,
    location: 'US'.toLowerCase(),
  };
  
  console.log('user id: ', userID);
  console.log('user Attributes: ', userAttributes);
  console.log('result of activating ecperiment', activateProductRecommendationsExperiment(userID, userAttributes))


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
