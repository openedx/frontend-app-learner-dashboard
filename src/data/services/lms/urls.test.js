import {
  getAppConfig, getSiteConfig, setSiteConfig,
} from '@openedx/frontend-base';
import {
  appId, courseOutlineRole, courseProgressRole, coursesRole, coursewareRole,
} from '@src/constants';
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
  describe('course urls', () => {
    const siteConfig = getSiteConfig();
    const courseId = 'course-v1:Test+101+2024';
    const siteOrigin = global.location.origin;

    afterEach(() => {
      setSiteConfig(siteConfig);
    });

    describe.each([
      ['courseHomeUrl', courseOutlineRole, 'home'],
      ['courseProgressUrl', courseProgressRole, 'progress'],
    ])('%s', (name, role, page) => {
      const sitePath = `/learning/course/${courseId}/${page}`;
      const lmsUrl = `${siteOrigin}${sitePath}`;

      it('returns the path of the route when an app provides it and the lms url leads there', () => {
        provideRoute(role, `learning/course/:courseId/${page}`);
        expect(decodeURIComponent(urls[name](courseId, lmsUrl))).toEqual(sitePath);
      });
      it('keeps the query string of the lms url', () => {
        provideRoute(role, `learning/course/:courseId/${page}`);
        expect(decodeURIComponent(urls[name](courseId, `${lmsUrl}/?a=b`))).toEqual(`${sitePath}?a=b`);
      });
      it('takes the basename of the site into account', () => {
        setSiteConfig({ ...siteConfig, basename: '/site' });
        provideRoute(role, `learning/course/:courseId/${page}`);
        expect(decodeURIComponent(urls[name](courseId, `${siteOrigin}/site${sitePath}`))).toEqual(sitePath);
        expect(urls[name](courseId, lmsUrl)).toEqual(lmsUrl);
      });
      it('returns the lms url when it leads somewhere else', () => {
        provideRoute(role, `learning/course/:courseId/${page}`);
        expect(urls[name](courseId, 'http://elsewhere.example.com/course')).toEqual('http://elsewhere.example.com/course');
        expect(urls[name](courseId, `${siteOrigin}/learning/course/another/${page}`))
          .toEqual(`${siteOrigin}/learning/course/another/${page}`);
      });
      it('returns the lms url when no app provides the route', () => {
        expect(urls[name](courseId, lmsUrl)).toEqual(lmsUrl);
      });
      it('returns the lms url when the route needs more than the course id', () => {
        provideRoute(role, `learning/course/:courseId/:other/${page}`);
        expect(urls[name](courseId, lmsUrl)).toEqual(lmsUrl);
      });
      it('passes on a missing lms url, and the lms url when the course id is missing', () => {
        provideRoute(role, `learning/course/:courseId/${page}`);
        expect(urls[name](courseId, null)).toEqual(null);
        expect(urls[name](undefined, lmsUrl)).toEqual(lmsUrl);
      });
    });

    it('courseHomeUrl leaves a relative lms url alone, and courseProgressUrl makes it absolute', () => {
      expect(urls.courseHomeUrl(courseId, '/relative')).toEqual('/relative');
      expect(urls.courseProgressUrl(courseId, '/relative')).toEqual(urls.baseAppUrl('/relative'));
    });

    describe('courseResumeUrl', () => {
      const jumpTo = `/courses/${courseId}/jump_to/block-v1:Test+101+2024+type@problem+block@abc`;

      it('returns the path of the courseware route when an app provides it', () => {
        provideRoute(coursewareRole, 'learning/course/:courseId');
        expect(decodeURIComponent(urls.courseResumeUrl(courseId, jumpTo))).toEqual(`/learning/course/${courseId}`);
        expect(decodeURIComponent(urls.courseResumeUrl(courseId, urls.baseAppUrl(jumpTo))))
          .toEqual(`/learning/course/${courseId}`);
      });
      it('returns the lms url, made absolute, when no app provides the route', () => {
        expect(urls.courseResumeUrl(courseId, jumpTo)).toEqual(urls.baseAppUrl(jumpTo));
      });
      it('returns the lms url when it is not its jump_to url for the course', () => {
        provideRoute(coursewareRole, 'learning/course/:courseId');
        expect(urls.courseResumeUrl(courseId, '/courses/another/jump_to/block'))
          .toEqual(urls.baseAppUrl('/courses/another/jump_to/block'));
        expect(urls.courseResumeUrl(courseId, `http://elsewhere.example.com${jumpTo}`))
          .toEqual(`http://elsewhere.example.com${jumpTo}`);
      });
      it('passes on a missing lms url', () => {
        provideRoute(coursewareRole, 'learning/course/:courseId');
        expect(urls.courseResumeUrl(courseId, null)).toEqual(null);
        expect(urls.courseResumeUrl(courseId, '')).toEqual(urls.baseAppUrl(''));
      });
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
