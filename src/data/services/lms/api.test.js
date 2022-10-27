import api from './api';
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
    post: (...args) => ({ post: args }),
    stringifyUrl: (...args) => ({ stringifyUrl: args }),
  };
});

const testUser = 'test-user';
const testUuid = 'test-UUID';
const testCourseId = 'TEST-course-ID';

describe('lms api methods', () => {
  describe('initializeList', () => {
    test('calls get with the correct url and user', () => {
      const userArg = {
        [apiKeys.user]: testUser,
      };
      expect(api.initializeList(userArg)).toEqual(
        utils.get(utils.stringifyUrl(urls.init, userArg)),
      );
    });
  });
  describe('updateEntitlementEnrollment', () => {
    it('calls post on entitlementEnrollment url with uuid and course run ID', () => {
      expect(
        api.updateEntitlementEnrollment({ uuid: testUuid, courseId: testCourseId }),
      ).toEqual(
        utils.post(utils.stringifyUrl(
          urls.entitlementEnrollment(testUuid),
          { [apiKeys.courseRunId]: testCourseId },
        )),
      );
    });
  });
  describe('deleteEntitlementEnrollment', () => {
    it('calls delete on entitlementEnrollment url with uuid and null course run ID', () => {
      expect(
        api.deleteEntitlementEnrollment({ uuid: testUuid }),
      ).toEqual(
        utils.client().delete(utils.stringifyUrl(
          urls.entitlementEnrollment(testUuid),
          { [apiKeys.courseRunId]: null },
        )),
      );
    });
  });
  describe('updateEmailSettings', () => {
    describe('disable', () => {
      it('calls post on updateEmailSettings url with course ID', () => {
        expect(
          api.updateEmailSettings({ courseId: testCourseId, enable: false }),
        ).toEqual(
          utils.post(utils.stringifyUrl(urls.updateEmailSettings),
            { [apiKeys.courseId]: testCourseId }),
        );
      });
    });
    describe('enable', () => {
      it('calls post on updateEmailSettings url with course ID and enableEmailsAction', () => {
        expect(
          api.updateEmailSettings({ courseId: testCourseId, enable: true }),
        ).toEqual(
          utils.post(utils.stringifyUrl(urls.updateEmailSettings),
            { [apiKeys.courseId]: testCourseId, ...enableEmailsAction }),
        );
      });
    });
  });
  describe('unenrollFromCourse', () => {
    it('calls post on unenrollFromCourse url with courseId and unenrollment action', () => {
      expect(
        api.unenrollFromCourse({ courseId: testCourseId }),
      ).toEqual(
        utils.post(utils.stringifyUrl(
          urls.courseUnenroll,
        ), { [apiKeys.courseId]: testCourseId, ...unenrollmentAction }),
      );
    });
  });
  describe('recommendedCourses', () => {
    test('calls get with the correct recommendation courses URL and user', () => {
      const userArg = {
        [apiKeys.user]: testUser,
      };
      expect(api.recommendedCourses(userArg)).toEqual(
        utils.get(utils.stringifyUrl(urls.recommendedCourses, userArg)),
      );
    });
  });
});
