import { get, stringifyUrl } from 'data/services/lms/utils';
import api, { getFetchUrl } from './api';

jest.mock('data/services/lms/utils', () => ({
  stringifyUrl: (...args) => ({ stringifyUrl: args }),
  get: (...args) => ({ get: args }),
}));

describe('recommendedCourses api', () => {
  describe('fetchRecommendedCourses', () => {
    it('calls get with the correct recommendation courses URL and user', () => {
      expect(api.fetchRecommendedCourses()).toEqual(
        get(stringifyUrl(getFetchUrl())),
      );
    });
  });
});
