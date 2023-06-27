import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const crossProductAndAmplitudeRecommendationsUrl = (courseId) => `${urls.getApiUrl()}/learner_recommendations/product_recommendations/${courseId}/`;
export const amplitudeRecommendationsUrl = () => `${urls.getApiUrl()}/learner_recommendations/product_recommendations/`;

const fetchCrossProductRecommendations = (courseId) => (
  get(stringifyUrl(crossProductAndAmplitudeRecommendationsUrl(courseId)))
);
const fetchAmplitudeRecommendations = () => get(stringifyUrl(amplitudeRecommendationsUrl()));

export default {
  fetchCrossProductRecommendations,
  fetchAmplitudeRecommendations,
};
