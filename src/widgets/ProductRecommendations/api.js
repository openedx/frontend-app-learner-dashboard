import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const crossProductAndAmplitudeRecommendationsUrl = (courseId) => `${urls.getApiUrl()}/edx_recommendations/learner_dashboard/cross_product/${courseId}/`;
export const amplitudeRecommendationsUrl = () => `${urls.getApiUrl()}/edx_recommendations/learner_dashboard/amplitude/v2/`;
export const recommendationsContextUrl = () => `${urls.getApiUrl()}/edx_recommendations/learner_dashboard/recommendations_context/`;

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
