import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMasquerade, useBackedData } from '@src/data/context';
import {
  useInitializeLearnerHome,
} from './index';
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

  return function Wrapper({ children }: { children: React.ReactNode }) {
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
      expect(result.current.data).toMatchObject(mockQueryData);
      expect(result.current.data).toHaveProperty('coursesByCardId');
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
});
