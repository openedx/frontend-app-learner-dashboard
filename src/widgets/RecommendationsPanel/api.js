import { StrictDict } from 'utils';
import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const getFetchUrl = () => (`${urls.getApiUrl()}/edx_recommendations/learner_dashboard/amplitude/`);
export const apiKeys = StrictDict({ user: 'user' });

const fetchRecommendedCourses = () => get(stringifyUrl(getFetchUrl()));

export default {
  fetchRecommendedCourses,
};
