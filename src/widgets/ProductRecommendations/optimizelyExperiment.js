import { StrictDict } from 'utils';
import optimizelyClient from './optimizely';

export const PRODUCT_RECOMMENDATIONS_EXP_KEY = 'learner_dashboard_product_recommendations_exp';
export const PRODUCT_RECOMMENDATIONS_EXP_VARIATION = 'learner_dashboard_product_recommendations_enabled';

export const eventNames = StrictDict({
  productRecommendationsViewed: 'product_recommendations_viewed',
  productHeaderClicked: 'product_header_clicked',
  productCardClicked: 'product_card_clicked',
  courseCardClicked: 'course_card_clicked',
});

export const activateProductRecommendationsExperiment = (userId, userAttributes) => {
  const variation = optimizelyClient?.activate(
    PRODUCT_RECOMMENDATIONS_EXP_KEY,
    userId,
    userAttributes,
  );

  return {
    experimentActivated: variation !== null,
    inExperimentVariant: variation === PRODUCT_RECOMMENDATIONS_EXP_VARIATION,
  };
};

export const trackProductRecommendationsViewed = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.productRecommendationsViewed, userId, userAttributes);
};

export const trackProductHeaderClicked = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.productHeaderClicked, userId, userAttributes);
};

export const trackProductCardClicked = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.productCardClicked, userId, userAttributes);
};

export const trackCourseCardClicked = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.courseCardClicked, userId, userAttributes);
};
