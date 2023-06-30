import React from 'react';
import './index.scss';
import { reduxHooks } from 'hooks';
import NoCoursesView from 'containers/CourseList/NoCoursesView';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';
import hooks from './hooks';

const ProductRecommendations = () => {
  const checkEmptyResponse = (obj) => {
    const values = Object.values(obj);
    const result = values.filter((item) => item.length === 0);
    return result.length === values.length;
  };

  const { productRecommendations, isLoading, isLoaded } = hooks.useProductRecommendationsData();
  const isMobile = hooks.useIsMobile();
  const hasCourses = reduxHooks.useHasCourses();
  const shouldShowPlaceholder = checkEmptyResponse(productRecommendations);

  if (isLoading && !isMobile) {
    return <LoadingView />;
  }

  if (isLoaded && !isMobile && !shouldShowPlaceholder) {
    return (
      <LoadedView
        openCourses={productRecommendations.amplitudeCourses}
        crossProductCourses={productRecommendations.crossProductCourses || []}
      />
    );
  }

  if (isLoaded && hasCourses && !isMobile && shouldShowPlaceholder) {
    return <NoCoursesView />;
  }
  return null;
};

export default ProductRecommendations;
