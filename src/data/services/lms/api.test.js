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
    get: jest.fn(),
    post: (...args) => ({ post: args }),
    stringifyUrl: (...args) => ({ stringifyUrl: args }),
  };
});

const testUser = 'test-user';
const testUuid = 'test-UUID';
const testCourseId = 'TEST-course-ID';
const testError = { response: { statusText: 'test-error-status-text' } };

const mockData = { some: 'test', data: '!!!' };

describe('lms api methods', () => {
  describe('initializeList', () => {
    it('calls get to init url with user field', async () => {
      utils.get.mockReturnValueOnce(Promise.resolve({ data: mockData }));
      await api.initializeList({ user: testUser });
      expect(utils.get).toHaveBeenCalledWith(utils.stringifyUrl(urls.init, { user: testUser }));
    });
    it('passes empty user if not provided', async () => {
      utils.get.mockReturnValueOnce(Promise.resolve({ data: mockData }));
      await api.initializeList();
      expect(utils.get).toHaveBeenCalledWith(utils.stringifyUrl(urls.init, {}));
    });
    it('resolves data from response on success', () => {
      utils.get.mockReturnValueOnce(Promise.resolve({ data: mockData }));
      expect(api.initializeList({ user: testUser })).resolves.toEqual({
        data: mockData,
      });
    });
    it('rejects with statusText on failure if available', () => {
      utils.get.mockReturnValueOnce(Promise.reject(testError));
      expect(api.initializeList({ user: testUser })).rejects.toEqual(testError);
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
          utils.post(utils.stringifyUrl(
            urls.updateEmailSettings,
            { [apiKeys.courseId]: testCourseId },
          )),
        );
      });
    });
    describe('enable', () => {
      it('calls post on updateEmailSettings url with course ID and enableEmailsAction', () => {
        expect(
          api.updateEmailSettings({ courseId: testCourseId, enable: true }),
        ).toEqual(
          utils.post(utils.stringifyUrl(
            urls.updateEmailSettings,
            { [apiKeys.courseId]: testCourseId, ...enableEmailsAction },
          )),
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
          { [apiKeys.courseId]: testCourseId, ...unenrollmentAction },
        )),
      );
    });
  });
});
