import { get, stringifyUrl } from 'data/services/lms/utils';

import api, { crossProductAndAmplitudeRecommendationsUrl, amplitudeRecommendationsUrl, recommendationsContextUrl } from './api';

jest.mock('data/services/lms/utils', () => ({
  stringifyUrl: (...args) => ({ stringifyUrl: args }),
  get: (...args) => ({ get: args }),
}));

describe('productRecommendationCourses api', () => {
  describe('fetchCrossProductRecommendations', () => {
    it('calls get with the correct recommendation courses URL', () => {
      expect(api.fetchCrossProductRecommendations('CourseRunKey')).toEqual(
        get(stringifyUrl(crossProductAndAmplitudeRecommendationsUrl('CourseRunKey'))),
      );
    });
  });

  describe('fetchAmplitudeRecommendations', () => {
    it('calls get with the correct recommendation courses URL', () => {
      expect(api.fetchAmplitudeRecommendations()).toEqual(
        get(stringifyUrl(amplitudeRecommendationsUrl())),
      );
    });
  });

  describe('fetchRecommendationsContext', () => {
    it('calls get with the correct recommendation courses URL', () => {
      expect(api.fetchRecommendationsContext()).toEqual(
        get(stringifyUrl(recommendationsContextUrl())),
      );
    });
  });
});
