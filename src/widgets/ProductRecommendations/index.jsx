import React from 'react';
import { reduxHooks } from 'hooks';
import './index.scss';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { useProductRecommendationsData } from './hooks';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';
import NoCoursesView from '../../containers/CourseList/NoCoursesView';

const ProductRecommendations = () => {
  const checkEmptyResponse = (obj) => {
    const values = Object.values(obj);
    const result = values.filter((item) => item.length === 0);
    return result.length === values.length;
  };

  const { productRecommendations, isLoading, isLoaded } = useProductRecommendationsData();
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;
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
