import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const productRecommendationsUrl = (courseId) => `${urls.api}/learner_recommendations/product_recommendations/${courseId}/`;

const fetchProductRecommendations = (courseId) => get(stringifyUrl(productRecommendationsUrl(courseId)));

export default {
  fetchProductRecommendations,
};
