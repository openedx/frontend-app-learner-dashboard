import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMasquerade } from '@src/data/context';
import {
  useInitializeLearnerHome,
} from './index';
import { learnerDashboardQueryKeys } from './queryKeys';
import * as api from '../services/lms/api';

// Mock external dependencies
jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  logError: jest.fn(),
}));
jest.mock('@src/data/context');
jest.mock('@src/data/services/lms/api');
jest.mock('@src/utils/dataTransformers', () => ({
  getTransformedCourseDataObject: jest.fn((courses) => {
    const result = {};
    (courses || []).forEach((c, i) => { result[`card-${i}`] = { ...c, cardId: `card-${i}` }; });
    return result;
  }),
}));
jest.mock('@src/data/contexts/GlobalDataContext', () => {
  const { createContext } = jest.requireActual('react');
  return {
    __esModule: true,
    default: createContext({
      setEmailConfirmation: jest.fn(),
      setPlatformSettings: jest.fn(),
    }),
  };
});

const mockUseMasquerade = useMasquerade as jest.MockedFunction<typeof useMasquerade>;

// Create a test wrapper with QueryClient
const createWrapper = (queryClient?: QueryClient) => {
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        retryDelay: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>
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
    const mockQueryData = { courses: ['query-course'], user: 'query-user' };
    const mockNormalUserData = { courses: ['normal-course'], user: 'normal-user', coursesByCardId: {} };

    it('should fetch and return data with coursesByCardId for normal user', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void { throw new Error('Function not implemented.'); },
      });
      const mockApiData = {
        courses: [{ id: 'course-1' }, { id: 'course-2' }],
        emailConfirmation: { isNeeded: false },
        platformSettings: { supportEmail: 'test@example.com' },
      };
      (api.initializeList as jest.Mock).mockResolvedValue(mockApiData);

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(api.initializeList).toHaveBeenCalledWith(undefined);
      expect(result.current.data).toMatchObject(mockApiData);
      expect(result.current.data?.coursesByCardId).toEqual({
        'card-0': { id: 'course-1', cardId: 'card-0' },
        'card-1': { id: 'course-2', cardId: 'card-1' },
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
      expect(result.current.data).toMatchObject(mockQueryData);
      expect(result.current.data).toHaveProperty('coursesByCardId');
    });

    it('should fall back to cached normal-user data when masquerading fails', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const error: any = new Error('API Error');
      error.response = { status: 403 };
      (api.initializeList as jest.Mock).mockRejectedValue(error);

      // Don't use gcTime: 0 here — we need the seeded cache entry to persist
      // for the fallback lookup via queryClient.getQueryData()
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, retryDelay: 0 }, mutations: { retry: false } },
      });
      queryClient.setQueryData(
        learnerDashboardQueryKeys.initialize(undefined),
        mockNormalUserData,
      );

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(api.initializeList).toHaveBeenCalledWith(masqueradeUser);
      expect(result.current.data).toEqual(mockNormalUserData);
    });

    it('should not retry on 4xx errors', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void { throw new Error('Function not implemented.'); },
      });
      const error: any = new Error('Forbidden');
      error.response = { status: 403 };
      (api.initializeList as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // 4xx errors should not be retried — only 1 call
      expect(api.initializeList).toHaveBeenCalledTimes(1);
    });

    it('should retry on 5xx errors up to 3 times', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void { throw new Error('Function not implemented.'); },
      });
      const error: any = new Error('Server Error');
      error.response = { status: 500 };
      (api.initializeList as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useInitializeLearnerHome(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // 1 initial + 3 retries = 4 total calls
      expect(api.initializeList).toHaveBeenCalledTimes(4);
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
});
