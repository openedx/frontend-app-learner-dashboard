import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const crossProductRecommendationsUrl = (courseId) => `${urls.api}/learner_recommendations/cross_product/${courseId}`;

const fetchCrossProductCourses = (courseId) => get(stringifyUrl(crossProductRecommendationsUrl(courseId)));

export default {
  fetchCrossProductCourses,
};
