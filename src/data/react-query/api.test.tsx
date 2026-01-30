import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { apiKeys, enableEmailsAction, unenrollmentAction } from 'data/services/lms/constants';
import urls from 'data/services/lms/urls';
import { stringifyUrl } from 'data/services/lms/utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import eventNames from 'tracking/constants';
import {
  initializeList,
  unenrollFromCourse,
  updateEntitlementEnrollment,
  deleteEntitlementEnrollment,
  updateEmailSettings,
  logEvent,
  logShare,
  createCreditRequest,
  sendConfirmEmail,
} from './api';

// Mock dependencies
jest.mock('@edx/frontend-platform/auth');
jest.mock('data/services/lms/constants');
jest.mock('data/services/lms/urls');
jest.mock('data/services/lms/utils');
jest.mock('tracking/constants');

const mockHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
};

const mockedGetAuthenticatedHttpClient = getAuthenticatedHttpClient as jest.MockedFunction<
  typeof getAuthenticatedHttpClient>;
const mockedStringifyUrl = stringifyUrl as jest.MockedFunction<typeof stringifyUrl>;

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetAuthenticatedHttpClient.mockReturnValue(mockHttpClient as any);

    // Mock constants
    (apiKeys as any) = {
      user: 'user',
      courseId: 'course_id',
      courseRunId: 'course_run_id',
      isRefund: 'is_refund',
    };

    (enableEmailsAction as any) = { enable: true };
    (unenrollmentAction as any) = { action: 'unenroll' };
    (eventNames as any) = { shareClicked: 'share_clicked' };

    // Mock urls
    (urls as any) = {
      getInitApiUrl: jest.fn(() => '/api/init'),
      courseUnenroll: jest.fn(() => '/api/unenroll'),
      entitlementEnrollment: jest.fn((uuid) => `/api/entitlement/${uuid}`),
      updateEmailSettings: jest.fn(() => '/api/email-settings'),
      event: jest.fn(() => '/api/event'),
      creditRequestUrl: jest.fn((providerId) => `/api/credit/${providerId}`),
    };

    mockedStringifyUrl.mockImplementation((url, params) => {
      const paramString = Object.entries(params || {}).map(([key, value]) => `${key}=${value}`).join('&');
      return paramString ? `${url}?${paramString}` : url;
    });

    // Mock window.location
    delete (window as any).location;
    (window as any).location = { href: 'https://example.com/dashboard' };
  });

  describe('initializeList', () => {
    it('should make GET request to init API with user parameter', async () => {
      const mockData = { courses: [], entitlements: [] };
      mockHttpClient.get.mockResolvedValue({ data: mockData });

      const result = await initializeList('test-user');

      expect(urls.getInitApiUrl).toHaveBeenCalled();
      expect(stringifyUrl).toHaveBeenCalledWith('/api/init', { user: 'test-user' });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/init?user=test-user');
      expect(result).toEqual(mockData);
    });

    it('should handle null user parameter', async () => {
      const mockData = { courses: [] };
      mockHttpClient.get.mockResolvedValue({ data: mockData });

      await initializeList(null);

      expect(stringifyUrl).toHaveBeenCalledWith('/api/init', { user: null });
    });
  });

  describe('unenrollFromCourse', () => {
    it('should make POST request to unenroll from course', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await unenrollFromCourse({ courseId: 'course-123' });

      expect(urls.courseUnenroll).toHaveBeenCalled();
      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/unenroll', {
        course_id: 'course-123',
        action: 'unenroll',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateEntitlementEnrollment', () => {
    it('should make POST request to update entitlement enrollment', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await updateEntitlementEnrollment({
        uuid: 'entitlement-uuid',
        courseId: 'course-123',
      });

      expect(urls.entitlementEnrollment).toHaveBeenCalledWith('entitlement-uuid');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/entitlement/entitlement-uuid', {
        course_run_id: 'course-123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteEntitlementEnrollment', () => {
    it('should make DELETE request with refundable flag', async () => {
      const mockResponse = { status: 204 };
      mockHttpClient.delete.mockResolvedValue(mockResponse);

      const result = await deleteEntitlementEnrollment({
        uuid: 'entitlement-uuid',
        isRefundable: true,
      });

      expect(urls.entitlementEnrollment).toHaveBeenCalledWith('entitlement-uuid');
      expect(stringifyUrl).toHaveBeenCalledWith('/api/entitlement/entitlement-uuid', {
        is_refund: true,
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/api/entitlement/entitlement-uuid?is_refund=true');
      expect(result).toEqual(mockResponse);
    });

    it('should handle non-refundable deletion', async () => {
      const mockResponse = { status: 204 };
      mockHttpClient.delete.mockResolvedValue(mockResponse);

      await deleteEntitlementEnrollment({
        uuid: 'entitlement-uuid',
        isRefundable: false,
      });

      expect(stringifyUrl).toHaveBeenCalledWith('/api/entitlement/entitlement-uuid', {
        is_refund: false,
      });
    });
  });

  describe('updateEmailSettings', () => {
    it('should make POST request to enable email settings', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await updateEmailSettings({
        courseId: 'course-123',
        enable: true,
      });

      expect(urls.updateEmailSettings).toHaveBeenCalled();
      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/email-settings', {
        course_id: 'course-123',
        enable: true,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should make POST request to disable email settings', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await updateEmailSettings({
        courseId: 'course-123',
        enable: false,
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/email-settings', {
        course_id: 'course-123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logEvent', () => {
    it('should make POST request to log event', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const eventData = {
        eventName: 'test-event',
        data: { key: 'value' },
        courseId: 'course-123',
      };

      const result = await logEvent(eventData);

      expect(urls.event).toHaveBeenCalled();
      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/event', {
        courserun_key: 'course-123',
        event_type: 'test-event',
        page: 'https://example.com/dashboard',
        event: JSON.stringify({ key: 'value' }),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logShare', () => {
    it('should call logEvent with share event data', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await logShare({
        courseId: 'course-123',
        site: 'facebook',
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/event', {
        courserun_key: 'course-123',
        event_type: 'share_clicked',
        page: 'https://example.com/dashboard',
        event: JSON.stringify({
          course_id: 'course-123',
          social_media_site: 'facebook',
          location: 'dashboard',
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createCreditRequest', () => {
    it('should make POST request to create credit request', async () => {
      const mockResponse = { status: 201 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await createCreditRequest({
        providerId: 'provider-123',
        courseId: 'course-123',
        username: 'test-user',
      });

      expect(urls.creditRequestUrl).toHaveBeenCalledWith('provider-123');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/credit/provider-123', {
        course_key: 'course-123',
        username: 'test-user',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendConfirmEmail', () => {
    it('should make POST request to send confirmation email', async () => {
      const mockResponse = { status: 200 };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await sendConfirmEmail('https://example.com/send-email');

      expect(mockHttpClient.post).toHaveBeenCalledWith('https://example.com/send-email');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should propagate network errors', async () => {
      const networkError = new Error('Network error');
      mockHttpClient.get.mockRejectedValue(networkError);

      await expect(initializeList('test-user')).rejects.toThrow('Network error');
    });

    it('should propagate API errors', async () => {
      const apiError = { response: { status: 404, data: { error: 'Not found' } } };
      mockHttpClient.post.mockRejectedValue(apiError);

      await expect(unenrollFromCourse({ courseId: 'invalid-course' })).rejects.toEqual(apiError);
    });
  });
});
