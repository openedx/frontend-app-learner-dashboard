import { mockLocation } from 'testUtils';
import { keyStore } from 'utils';
import eventNames from 'tracking/constants';
import * as api from './api';
import * as utils from './utils';
import urls from './urls';
import {
  apiKeys,
  unenrollmentAction,
  enableEmailsAction,
} from './constants';

jest.mock('./utils', () => {
  const deleteFn = (...args) => ({ delete: args });
  return {
    client: () => ({ delete: deleteFn }),
    delete: deleteFn,
    get: (...args) => ({ get: args }),
    post: jest.fn((...args) => ({ post: args })),
    stringifyUrl: (...args) => ({ stringifyUrl: args }),
  };
});

const testUser = 'test-user';
const testUuid = 'test-UUID';
const courseId = 'TEST-course-ID';
const isRefundable = 'test-is-refundable';

const moduleKeys = keyStore(api);

describe('lms api methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('keys identical to module', () => {
    /* eslint-disable-next-line global-require */
    const { default: defaultApi, ...rest } = require('./api');
    expect(Object.keys(rest).sort()).toMatchObject(Object.keys(defaultApi).sort());
  });
  describe('initializeList', () => {
    test('calls get with the correct url and user', () => {
      const userArg = {
        [apiKeys.user]: testUser,
      };
      expect(api.initializeList(userArg)).toEqual(
        utils.get(utils.stringifyUrl(urls.getInitApiUrl(), userArg)),
      );
    });
  });
  describe('updateEntitlementEnrollment', () => {
    it('calls post on entitlementEnrollment url with uuid and course run ID', () => {
      expect(
        api.updateEntitlementEnrollment({ uuid: testUuid, courseId }),
      ).toEqual(
        utils.post(
          urls.entitlementEnrollment(testUuid),
          { [apiKeys.courseRunId]: courseId },
        ),
      );
    });
  });
  describe('deleteEntitlementEnrollment', () => {
    it('calls delete on entitlementEnrollment url with uuid and null course run ID', () => {
      expect(
        api.deleteEntitlementEnrollment({ uuid: testUuid, isRefundable }),
      ).toEqual(
        utils.client().delete(utils.stringifyUrl(
          urls.entitlementEnrollment(testUuid),
          { [apiKeys.isRefund]: isRefundable },
        )),
      );
    });
  });
  describe('updateEmailSettings', () => {
    describe('disable', () => {
      it('calls post on updateEmailSettings url with course ID', () => {
        expect(
          api.updateEmailSettings({ courseId, enable: false }),
        ).toEqual(
          utils.post(urls.updateEmailSettings, { [apiKeys.courseId]: courseId }),
        );
      });
    });
    describe('enable', () => {
      it('calls post on updateEmailSettings url with course ID and enableEmailsAction', () => {
        expect(
          api.updateEmailSettings({ courseId, enable: true }),
        ).toEqual(
          utils.post(
            urls.updateEmailSettings,
            { [apiKeys.courseId]: courseId, ...enableEmailsAction },
          ),
        );
      });
    });
  });
  describe('unenrollFromCourse', () => {
    it('calls post on unenrollFromCourse url with courseId and unenrollment action', () => {
      expect(
        api.unenrollFromCourse({ courseId }),
      ).toEqual(
        utils.post(
          urls.courseUnenroll,
          { [apiKeys.courseId]: courseId, ...unenrollmentAction },
        ),
      );
    });
  });
  describe('logging events', () => {
    describe('logEvent', () => {
      it('posts to event url with event data', () => {
        const href = 'test-href';
        const eventName = 'test-event-key';
        const data = { some: 'data' };
        mockLocation(href);
        expect(
          api.logEvent({ courseId, eventName, data }),
        ).toEqual(
          utils.post(urls.event, {
            courserun_key: courseId,
            event_type: eventName,
            page: href,
            event: JSON.stringify(data),
          }),
        );
      });
    });
    describe('logged events', () => {
      const logEvent = (args) => ({ logEvent: args });
      beforeEach(() => {
        jest.spyOn(api, moduleKeys.logEvent).mockImplementation(logEvent);
      });
      test('logUpgrade sends enrollment upgrade click event with learner dashboard location', () => {
        expect(api.logUpgrade({ courseId })).toEqual(logEvent({
          eventName: eventNames.upgradeButtonClickedEnrollment,
          courseId,
          data: { location: 'learner-dashboard' },
        }));
      });
      test('logShare sends share clicke vent with course id, side and location', () => {
        const site = 'test-site';
        expect(api.logShare({ courseId, site })).toEqual(logEvent({
          eventName: eventNames.shareClicked,
          courseId,
          data: { course_id: courseId, social_media_site: site, location: 'dashboard' },
        }));
      });
    });
  });
  describe('credit requests', () => {
    describe('createCreditRequest', () => {
      const providerId = 'test-provider-id';
      const username = 'test-username';
      it('posts course ID and username to credit request url', () => {
        api.createCreditRequest({ providerId, courseId, username });
        expect(utils.post).toHaveBeenCalledWith(
          urls.creditRequestUrl(providerId),
          { course_key: courseId, username },
        );
      });
    });
  });
});
