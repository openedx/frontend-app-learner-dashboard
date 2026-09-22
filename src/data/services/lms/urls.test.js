import {
  getAppConfig, getSiteConfig, setSiteConfig,
} from '@openedx/frontend-base';
import { appId, coursesRole } from '@src/constants';
import { provideRoute } from '@src/testUtils';
import * as urls from './urls';

describe('urls', () => {
  const config = getAppConfig(appId);
  const { ECOMMERCE_BASE_URL } = config;

  afterEach(() => {
    delete config.CREDIT_PURCHASE_URL;
    config.ECOMMERCE_BASE_URL = ECOMMERCE_BASE_URL;
  });

  describe('baseAppUrl', () => {
    it('returns the url if it is not relative', () => {
      const url = 'http://edx.org';
      expect(urls.baseAppUrl(url)).toEqual(url);
    });
    it('returns the url if it is relative', () => {
      const url = '/edx.org';
      expect(urls.baseAppUrl(url)).toEqual(
        `${getSiteConfig().lmsBaseUrl}${url}`,
      );
    });
    it('return null if url is null', () => {
      expect(urls.baseAppUrl(null)).toEqual(null);
    });
  });
  describe('coursesUrl', () => {
    const siteConfig = getSiteConfig();

    afterEach(() => {
      setSiteConfig(siteConfig);
    });

    it('returns the path of the courses route when an app provides it', () => {
      provideRoute(coursesRole, 'courses');
      expect(urls.coursesUrl('/course-search-url')).toEqual('/courses');
    });
    it('falls back to the course search url on the lms', () => {
      expect(urls.coursesUrl('/course-search-url')).toEqual(urls.baseAppUrl('/course-search-url'));
    });
  });
  describe('creditPurchaseUrl', () => {
    it('builds from ecommerce url and loads courseId', () => {
      const courseId = 'test-course-id';
      const url = urls.creditPurchaseUrl(courseId);
      expect(url).toEqual(expect.stringContaining(courseId));
    });
    it('returns CREDIT_PURCHASE_URL if set, with courseId', () => {
      const courseId = 'test-course-id';
      config.CREDIT_PURCHASE_URL = 'http://credit-purchase.example.com';
      const url = urls.creditPurchaseUrl(courseId);
      expect(url).toBe(`http://credit-purchase.example.com/${courseId}/`);
    });
    it('returns null if neither url is configured', () => {
      delete config.ECOMMERCE_BASE_URL;
      expect(urls.creditPurchaseUrl('test-course-id')).toBeNull();
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
