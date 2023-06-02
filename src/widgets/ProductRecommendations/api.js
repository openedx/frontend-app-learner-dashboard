import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const crossProductRecommendationsUrl = (courseId) => `${urls.api}/learner_recommendations/product_recommendations/${courseId}/`;

const fetchProductRecommendations = (courseId) => get(stringifyUrl(crossProductRecommendationsUrl(courseId)));

export default {
  fetchProductRecommendations,
};
