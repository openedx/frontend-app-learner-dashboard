import { get, stringifyUrl } from 'data/services/lms/utils';
import api, { crossProductRecommendationsUrl } from './api';

jest.mock('data/services/lms/utils', () => ({
  stringifyUrl: (...args) => ({ stringifyUrl: args }),
  get: (...args) => ({ get: args }),
}));

describe('productRecommendationCourses api', () => {
  describe('fetchProductRecommendations', () => {
    it('calls get with the correct recommendation courses URL', () => {
      expect(api.fetchProductRecommendations('CourseRunKey')).toEqual(
        get(stringifyUrl(crossProductRecommendationsUrl('CourseRunKey'))),
      );
    });
  });
});
