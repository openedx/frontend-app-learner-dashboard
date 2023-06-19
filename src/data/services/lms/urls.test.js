import { getConfig } from '@edx/frontend-platform';
import * as urls from './urls';

describe('urls', () => {
  describe('baseAppUrl', () => {
    it('returns the url if it is not relative', () => {
      const url = 'http://edx.org';
      expect(urls.baseAppUrl(url)).toEqual(url);
    });
    it('returns the url if it is relative', () => {
      const url = '/edx.org';
      expect(urls.baseAppUrl(url)).toEqual(
        `${getConfig().LMS_BASE_URL}${url}`,
      );
    });
    it('return null if url is null', () => {
      expect(urls.baseAppUrl(null)).toEqual(null);
    });
  });
  describe('learningMfeUrl', () => {
    it('returns the url if it is not relative', () => {
      const url = 'http://edx.org';
      expect(urls.learningMfeUrl(url)).toEqual(url);
    });
    it('returns the url if it is relative', () => {
      const url = '/edx.org';
      expect(urls.learningMfeUrl(url)).toEqual(
        `${getConfig().LEARNING_BASE_URL}${url}`,
      );
    });
    it('return null if url is null', () => {
      expect(urls.learningMfeUrl(null)).toEqual(null);
    });
  });
  describe('creditPurchaseUrl', () => {
    it('builds from ecommerce url and loads courseId', () => {
      const courseId = 'test-course-id';
      const url = urls.creditPurchaseUrl(courseId);
      expect(url).toEqual(expect.stringContaining(courseId));
    });
  });
  describe('creditRequestUrl', () => {
    it('builds from api url and loads providerId', () => {
      const providerId = 'test-provider-id';
      const url = urls.creditRequestUrl(providerId);
      expect(url.startsWith(urls.getApiUrl())).toEqual(true);
      expect(url).toEqual(expect.stringContaining(providerId));
    });
  });
});
