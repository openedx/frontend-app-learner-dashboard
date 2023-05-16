import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const getCrossProductRecommendationsUrl = (courseId) => `${urls.api}/learner_recommendations/cross_product/${courseId}`;

const fetchCrossProductCourses = (courseId) => get(stringifyUrl(getCrossProductRecommendationsUrl(courseId)));

export default {
  fetchCrossProductCourses,
};
