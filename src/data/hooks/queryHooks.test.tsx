import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMasquerade, useBackedData } from 'data/context';
import {
  useInitializeLearnerHome,
} from './index';
import * as api from '../services/lms/api';
import { useProgramsListData } from './queryHooks';
import { fetchProgramsListData } from '../services/lms/api';
// Mock external dependencies
jest.mock('@edx/frontend-platform/logging');
jest.mock('data/context');
jest.mock('data/services/lms/api');

const mockGet = jest.fn(() => ({
  data: {},
}));
const mockLMSBaseUrl = 'http://test-lms-base-url';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(() => ({
    get: mockGet,
  })),
}));
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: mockLMSBaseUrl,
  })),
}));

const mockUseMasquerade = useMasquerade as jest.MockedFunction<typeof useMasquerade>;
const mockUseBackedData = useBackedData as jest.MockedFunction<typeof useBackedData>;

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

describe('queryHooks', () => {
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

  describe('useProgramsListData', () => {
    it('calls fetchProgramsListData as the query function', async () => {
      (fetchProgramsListData as jest.Mock).mockResolvedValue({});
      renderHook(() => useProgramsListData(), { wrapper: createWrapper() });
      await waitFor(() => expect(fetchProgramsListData).toHaveBeenCalled());
    });

    it('returns data on success', async () => {
      const mockData = { results: [{ uuid: 'test-uuid' }] };
      (fetchProgramsListData as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useProgramsListData(), { wrapper: createWrapper() });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockData);
    });

    it('handles error state correctly', async () => {
      (fetchProgramsListData as jest.Mock).mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => useProgramsListData(), { wrapper: createWrapper() });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toEqual(new Error('API Error'));
    });
  });
});
