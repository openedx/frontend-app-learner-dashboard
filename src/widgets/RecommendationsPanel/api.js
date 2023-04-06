import { StrictDict } from 'utils';
import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const fetchUrl = `${urls.api}/learner_recommendations/courses/`;
export const apiKeys = StrictDict({ user: 'user' });

const fetchRecommendedCourses = () => get(stringifyUrl(fetchUrl));

export default {
  fetchRecommendedCourses,
};
