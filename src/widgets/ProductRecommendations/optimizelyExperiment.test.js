import optimizelyClient from './optimizely';
import {
  eventNames,
  PRODUCT_RECOMMENDATIONS_EXP_KEY,
  PRODUCT_RECOMMENDATIONS_EXP_VARIATION,
  activateProductRecommendationsExperiment,
  trackProductRecommendationsViewed,
  trackProductHeaderClicked,
  trackProductCardClicked,
  trackCourseCardClicked,
} from './optimizelyExperiment';

jest.mock('./optimizely', () => ({
  activate: jest.fn(),
  track: jest.fn(),
}));

const userId = '1';
const userAttributes = {
  is_enterprise_user: false,
  location: 'us',
  is_mobile_user: false,
};

describe('Optimizely events', () => {
  describe('activateProductRecommendationsExperiment', () => {
    it('activates the experiment and returns in recommendations experiment variant', () => {
      optimizelyClient.activate.mockReturnValueOnce(PRODUCT_RECOMMENDATIONS_EXP_VARIATION);
      const inRecommendationsVariant = activateProductRecommendationsExperiment(userId, userAttributes);

      expect(inRecommendationsVariant).toBeTruthy();
      expect(optimizelyClient.activate).toHaveBeenCalledWith(
        PRODUCT_RECOMMENDATIONS_EXP_KEY,
        userId,
        userAttributes,
      );
    });
  });
  describe('trackProductRecommendationsViewed', () => {
    it('sends the productRecommendationsViewed event', () => {
      trackProductRecommendationsViewed(userId);
      expect(optimizelyClient.track).toHaveBeenCalledWith(
        eventNames.productRecommendationsViewed,
        userId,
        {},
      );
    });
  });
  describe('trackProductHeaderClicked', () => {
    it('sends the productHeaderClicked event', () => {
      trackProductHeaderClicked(userId);
      expect(optimizelyClient.track).toHaveBeenCalledWith(
        eventNames.productHeaderClicked,
        userId,
        {},
      );
    });
  });
  describe('trackProductCardClicked', () => {
    it('sends the productCardClicked event', () => {
      trackProductCardClicked(userId);
      expect(optimizelyClient.track).toHaveBeenCalledWith(
        eventNames.productCardClicked,
        userId,
        {},
      );
    });
  });
  describe('trackCourseCardClicked', () => {
    it('sends the courseCardClicked event', () => {
      trackCourseCardClicked(userId);
      expect(optimizelyClient.track).toHaveBeenCalledWith(
        eventNames.courseCardClicked,
        userId,
        {},
      );
    });
  });
});
