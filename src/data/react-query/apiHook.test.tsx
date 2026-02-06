import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { logError } from '@edx/frontend-platform/logging';
import { useMasquerade } from 'data/context/MasqueradeProvider';
import { useBackedData } from 'data/context/BackedDataProvider';
import {
  useInitializeLearnerHome,
  useUnenrollFromCourse,
  useUpdateEntitlementEnrollment,
  useDeleteEntitlementEnrollment,
  useUpdateEmailSettings,
  useLogShare,
  useCreateCreditRequest,
  useSendConfirmEmail,
} from './apiHooks';
import * as api from '../services/lms/api';

// Mock external dependencies
jest.mock('@edx/frontend-platform/logging');
jest.mock('data/context/MasqueradeProvider');
jest.mock('data/context/BackedDataProvider');
jest.mock('data/services/lms/api');

const mockUseMasquerade = useMasquerade as jest.MockedFunction<typeof useMasquerade>;
const mockUseBackedData = useBackedData as jest.MockedFunction<typeof useBackedData>;
const mockLogError = logError as jest.MockedFunction<typeof logError>;

// Create a test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  // eslint-disable-next-line func-names
  return function ({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
};

describe('apiHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useInitializeLearnerHome', () => {
    const mockBackupData = { courses: ['backup-course'], user: 'backup-user' };
    const mockQueryData = { courses: ['query-course'], user: 'query-user' };
    const mockSetBackUpData = jest.fn();

    beforeEach(() => {
      mockUseBackedData.mockReturnValue({
        backUpData: mockBackupData,
        setBackUpData: mockSetBackUpData,
      });
    });

    it('should use query data when masquerading and query succeeds', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      (api.initializeList as jest.Mock).mockResolvedValue(mockQueryData);

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(api.initializeList).toHaveBeenCalledWith(masqueradeUser);
      expect(result.current.data).toEqual(mockQueryData);
      expect(mockSetBackUpData).not.toHaveBeenCalled();
    });

    it('should use backup data when masquerading and query fails', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      (api.initializeList as jest.Mock).mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(api.initializeList).toHaveBeenCalledWith(masqueradeUser);
      expect(result.current.data).toEqual(mockBackupData);
      expect(mockSetBackUpData).not.toHaveBeenCalled();
    });

    it('should not set backup data when masquerading', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      (api.initializeList as jest.Mock).mockResolvedValue(mockQueryData);

      renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockSetBackUpData).not.toHaveBeenCalled();
      });
    });

    it('should have correct query configuration for masquerading', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      (api.initializeList as jest.Mock).mockResolvedValue(mockQueryData);

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      // For masquerading, retryOnMount and refetchOnMount should be false
      expect(result.current.isRefetchError).toBe(false);
    });
  });

  describe('useUnenrollFromCourse', () => {
    it('should unenroll successfully and invalidate queries', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');
      (api.unenrollFromCourse as jest.Mock).mockResolvedValue({});

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useUnenrollFromCourse(), { wrapper });

      await result.current.mutateAsync({ courseId: 'test-course-id' });

      expect(api.unenrollFromCourse).toHaveBeenCalledWith({ courseId: 'test-course-id' });
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: expect.arrayContaining(['learner-dashboard', 'initialize']),
      });
    });

    it('should log error when unenroll fails', async () => {
      const error = new Error('Network error');
      (api.unenrollFromCourse as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useUnenrollFromCourse(), {
        wrapper: createWrapper(),
      });

      await expect(result.current.mutateAsync({ courseId: 'test-course-id' }))
        .rejects.toThrow('Network error');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to unenroll from course test-course-id:',
        error,
      );
    });
  });

  describe('useUpdateEntitlementEnrollment', () => {
    it('should update entitlement enrollment successfully', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');
      (api.updateEntitlementEnrollment as jest.Mock).mockResolvedValue({});

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useUpdateEntitlementEnrollment(), { wrapper });

      await result.current.mutateAsync({ uuid: 'test-uuid', courseId: 'test-course' });

      expect(api.updateEntitlementEnrollment).toHaveBeenCalledWith({
        uuid: 'test-uuid',
        courseId: 'test-course',
      });
      expect(invalidateQueriesSpy).toHaveBeenCalled();
    });

    it('should log error when update fails', async () => {
      const error = new Error('Update failed');
      (api.updateEntitlementEnrollment as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useUpdateEntitlementEnrollment(), {
        wrapper: createWrapper(),
      });

      await expect(result.current.mutateAsync({ uuid: 'test-uuid', courseId: 'test-course' }))
        .rejects.toThrow('Update failed');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to update entitlement enrollment for UUID test-uuid:',
        error,
      );
    });
  });

  describe('useDeleteEntitlementEnrollment', () => {
    it('should delete entitlement enrollment successfully', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');
      (api.deleteEntitlementEnrollment as jest.Mock).mockResolvedValue({});

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useDeleteEntitlementEnrollment(), { wrapper });

      await result.current.mutateAsync({ uuid: 'test-uuid', isRefundable: true });

      expect(api.deleteEntitlementEnrollment).toHaveBeenCalledWith({
        uuid: 'test-uuid',
        isRefundable: true,
      });
      expect(invalidateQueriesSpy).toHaveBeenCalled();
    });

    it('should log error when deletion fails', async () => {
      const error = new Error('Deletion failed');
      (api.deleteEntitlementEnrollment as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useDeleteEntitlementEnrollment(), {
        wrapper: createWrapper(),
      });

      await expect(result.current.mutateAsync({ uuid: 'test-uuid', isRefundable: false }))
        .rejects.toThrow('Deletion failed');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to delete entitlement enrollment for UUID test-uuid:',
        error,
      );
    });
  });

  describe('useUpdateEmailSettings', () => {
    it('should update email settings successfully', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');
      (api.updateEmailSettings as jest.Mock).mockResolvedValue({});

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useUpdateEmailSettings(), { wrapper });

      await result.current.mutateAsync({ courseId: 'test-course', enable: true });

      expect(api.updateEmailSettings).toHaveBeenCalledWith({
        courseId: 'test-course',
        enable: true,
      });
      expect(invalidateQueriesSpy).toHaveBeenCalled();
    });

    it('should log error when email settings update fails', async () => {
      const error = new Error('Email settings update failed');
      (api.updateEmailSettings as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useUpdateEmailSettings(), {
        wrapper: createWrapper(),
      });

      await expect(result.current.mutateAsync({ courseId: 'test-course', enable: false }))
        .rejects.toThrow('Email settings update failed');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to update email settings for course test-course:',
        error,
      );
    });
  });

  describe('useLogShare', () => {
    it('should log share event successfully', async () => {
      (api.logShare as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useLogShare(), {
        wrapper: createWrapper(),
      });

      await result.current.mutateAsync({ courseId: 'test-course', site: 'facebook' });

      expect(api.logShare).toHaveBeenCalledWith({
        courseId: 'test-course',
        site: 'facebook',
      });
    });

    it('should log error when share logging fails', async () => {
      const error = new Error('Share logging failed');
      (api.logShare as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useLogShare(), {
        wrapper: createWrapper(),
      });

      await expect(result.current.mutateAsync({ courseId: 'test-course', site: 'twitter' }))
        .rejects.toThrow('Share logging failed');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to log share event for course test-course on twitter:',
        error,
      );
    });
  });

  describe('useCreateCreditRequest', () => {
    it('should create credit request successfully', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');
      (api.createCreditRequest as jest.Mock).mockResolvedValue({});

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useCreateCreditRequest(), { wrapper });

      const creditParams = {
        providerId: 'test-provider',
        courseId: 'test-course',
        username: 'test-user',
      };

      await result.current.mutateAsync(creditParams);

      expect(api.createCreditRequest).toHaveBeenCalledWith(creditParams);
      expect(invalidateQueriesSpy).toHaveBeenCalled();
    });

    it('should log error when credit request creation fails', async () => {
      const error = new Error('Credit request failed');
      (api.createCreditRequest as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useCreateCreditRequest(), {
        wrapper: createWrapper(),
      });

      const creditParams = {
        providerId: 'test-provider',
        courseId: 'test-course',
        username: 'test-user',
      };

      await expect(result.current.mutateAsync(creditParams))
        .rejects.toThrow('Credit request failed');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to create credit request for course test-course with provider test-provider:',
        error,
      );
    });
  });

  describe('useSendConfirmEmail', () => {
    it('should send confirmation email successfully', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');
      (api.sendConfirmEmail as jest.Mock).mockResolvedValue({});

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const sendEmailUrl = 'https://example.com/send-email';
      const { result } = renderHook(() => useSendConfirmEmail(sendEmailUrl), { wrapper });

      await result.current.mutateAsync();

      expect(api.sendConfirmEmail).toHaveBeenCalledWith(sendEmailUrl);
      expect(invalidateQueriesSpy).toHaveBeenCalled();
    });

    it('should log error when sending confirmation email fails', async () => {
      const error = new Error('Email sending failed');
      (api.sendConfirmEmail as jest.Mock).mockRejectedValue(error);

      const sendEmailUrl = 'https://example.com/send-email';
      const { result } = renderHook(() => useSendConfirmEmail(sendEmailUrl), {
        wrapper: createWrapper(),
      });

      await expect(result.current.mutateAsync())
        .rejects.toThrow('Email sending failed');

      expect(mockLogError).toHaveBeenCalledWith(
        'Failed to send confirmation email:',
        error,
      );
    });
  });

  describe('Query invalidation behavior', () => {
    it('should invalidate correct queries for all mutation hooks', async () => {
      const queryClient = new QueryClient();
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      // Mock successful API responses
      (api.unenrollFromCourse as jest.Mock).mockResolvedValue({});
      (api.updateEntitlementEnrollment as jest.Mock).mockResolvedValue({});
      (api.updateEmailSettings as jest.Mock).mockResolvedValue({});
      (api.createCreditRequest as jest.Mock).mockResolvedValue({});
      (api.sendConfirmEmail as jest.Mock).mockResolvedValue({});

      // Test each hook that should invalidate queries
      const hooks = [
        { hook: useUnenrollFromCourse, params: { courseId: 'test' } },
        { hook: useUpdateEntitlementEnrollment, params: { uuid: 'test', courseId: 'test' } },
        { hook: useUpdateEmailSettings, params: { courseId: 'test', enable: true } },
        { hook: useCreateCreditRequest, params: { providerId: 'test', courseId: 'test', username: 'test' } },
        { hook: useSendConfirmEmail, params: undefined, arg: 'https://test.com' },
      ];

      for (const { hook, params, arg } of hooks) {
        invalidateQueriesSpy.mockClear();
        // ts-ignore to handle varying params
        // @ts-ignore
        const { result } = renderHook(() => (arg ? hook(arg) : hook()), { wrapper });

        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await result.current.mutateAsync(params);

        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: expect.arrayContaining(['learner-dashboard', 'initialize']),
        });
      }
    });
  });
});
