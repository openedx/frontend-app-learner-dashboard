import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { logError, logInfo } from '@edx/frontend-platform/logging';

import * as api from './api';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: 'test-lms-url',
  })),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
  getAuthenticatedUser: jest.fn(),
}));

jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
  logInfo: jest.fn(),
}));

const testData = 'test-data';
const successfulGet = () => Promise.resolve(testData);
const error404 = { customAttributes: { httpErrorStatus: 404 }, test: 'error' };
const error404Get = () => Promise.reject(error404);
const error500 = { customAttributes: { httpErrorStatus: 500 }, test: 'error' };
const error500Get = () => Promise.reject(error500);

const get = jest.fn().mockImplementation(successfulGet);
getAuthenticatedHttpClient.mockReturnValue({ get });
const authenticatedUser = { fake: 'user' };
getAuthenticatedUser.mockReturnValue(authenticatedUser);

const onLoad = jest.fn();
describe('getNotices api method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    describe('not authenticated', () => {
      it('does not fetch anything', () => {
        getAuthenticatedUser.mockReturnValueOnce(null);
        api.getNotices({ onLoad });
        expect(get).not.toHaveBeenCalled();
      });
    });
    describe('authenticated', () => {
      it('fetches noticesUrl with onLoad behavior', async () => {
        await api.getNotices({ onLoad });
        expect(get).toHaveBeenCalledWith(api.noticesUrl, {});
        expect(onLoad).toHaveBeenCalledWith(testData);
      });
      it('calls logInfo if fetch fails with 404', async () => {
        get.mockImplementation(error404Get);
        await api.getNotices({ onLoad });
        expect(logInfo).toHaveBeenCalledWith(`${error404}. ${api.error404Message}`);
      });
      it('calls logError if fetch fails with non-404 error', async () => {
        get.mockImplementation(error500Get);
        await api.getNotices({ onLoad });
        expect(logError).toHaveBeenCalledWith(error500);
      });
    });
  });
});
