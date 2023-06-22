import { StrictDict } from 'utils';
import optimizelyClient from './optimizely';

const PRODUCT_RECOMMENDATIONS_EXP_KEY = 'learner_dashboard_product_recommendations_exp';
const PRODUCT_RECOMMENDATIONS_EXP_VARIATION = 'learner_dashboard_product_recommendations_enabled';

const eventNames = StrictDict({
  productRecommendationsViewed: 'product_recommendations_viewed',
  productRecommendationsHeaderClicked: 'product_recommendations_header_click',
  productCardClicked: 'product_card_click',
  courseCardClicked: 'course_card_click',
});

const activateProductRecommendationsExperiment = (userId) => {
  const variation = optimizelyClient.activate(
    PRODUCT_RECOMMENDATIONS_EXP_KEY,
    userId,
  );

  console.log(`variation: ${variation}`);

  return variation === PRODUCT_RECOMMENDATIONS_EXP_VARIATION;
};

const trackProductRecommendationsViewed = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.productRecommendationsViewed, userId, userAttributes);
};

const trackProductRecommendationsHeaderClick = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.productRecommendationsHeaderClicked, userId, userAttributes);
};

const trackProductCardClick = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.productCardClicked, userId, userAttributes);
};

const trackCourseCardClick = (userId, userAttributes = {}) => {
  optimizelyClient.track(eventNames.courseCardClicked, userId, userAttributes);
};

export {
  activateProductRecommendationsExperiment,
  trackProductRecommendationsViewed,
  trackProductRecommendationsHeaderClick,
  trackProductCardClick,
  trackCourseCardClick,
};
