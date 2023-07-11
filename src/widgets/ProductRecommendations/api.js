import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const crossProductAndAmplitudeRecommendationsUrl = (courseId) => `${urls.getApiUrl()}/learner_recommendations/product_recommendations/${courseId}/`;
export const amplitudeRecommendationsUrl = () => `${urls.getApiUrl()}/learner_recommendations/product_recommendations/`;
export const recommendationsContextUrl = () => `${urls.getApiUrl()}/learner_recommendations/recommendations_context/`;

const fetchRecommendationsContext = () => get(stringifyUrl(recommendationsContextUrl()));

const fetchCrossProductRecommendations = (courseId) => (
  get(stringifyUrl(crossProductAndAmplitudeRecommendationsUrl(courseId)))
);
const fetchAmplitudeRecommendations = () => get(stringifyUrl(amplitudeRecommendationsUrl()));

export default {
  fetchCrossProductRecommendations,
  fetchAmplitudeRecommendations,
  fetchRecommendationsContext,
};
