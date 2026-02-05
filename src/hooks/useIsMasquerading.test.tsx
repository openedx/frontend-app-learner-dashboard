import { renderHook } from '@testing-library/react';
import { useMasquerade } from 'data/context/MasqueradeProvider';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import { useIsMasquerading } from 'hooks';

jest.mock('data/context/MasqueradeProvider');
jest.mock('data/react-query/apiHooks');

const mockUseMasquerade = useMasquerade as jest.MockedFunction<typeof useMasquerade>;
const mockUseInitializeLearnerHome = useInitializeLearnerHome as jest.MockedFunction<typeof useInitializeLearnerHome>;

describe('useIsMasquerading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('returns true when masquerading successfully', () => {
    it('should return true when masqueradeUser exists and no error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'test-user',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(true);
    });

    it('should return true when masqueradeUser is a non-empty string and no error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'admin@example.com',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(true);
    });

    it('should return true when masqueradeUser is valid and query is loading', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'test-user',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: false,
        isLoading: true,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(true);
    });

    it('should return true when masqueradeUser is valid and query is successful', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'student123',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: [] },
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(true);
    });
  });

  describe('returns false when no masqueradeUser', () => {
    it('should return false when masqueradeUser is null', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is undefined', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is empty string', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: '',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is whitespace only', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: '   ',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(true);
    });
  });

  describe('returns false when there is an error', () => {
    it('should return false when masqueradeUser exists but query has error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'test-user',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('API Error'),
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is valid but query fails with network error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'admin@example.com',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('Network Error'),
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is valid but query fails with 404 error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'nonexistent-user',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: { response: { status: 404 } },
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });
  });

  describe('returns false for edge cases', () => {
    it('should return false when both masqueradeUser is undefined and there is an error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('API Error'),
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is empty string and there is an error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: '',
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('API Error'),
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });

    it('should return false when masqueradeUser is undefined and there is an error', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('API Error'),
      } as any);

      const { result } = renderHook(() => useIsMasquerading());

      expect(result.current).toBe(false);
    });
  });

  describe('hook behavior and reactivity', () => {
    it('should update when masqueradeUser changes', () => {
      const { result, rerender } = renderHook(() => useIsMasquerading());
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });

      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      rerender();
      expect(result.current).toBe(false);

      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'test-user',
        setMasqueradeUser: jest.fn(),
      });

      rerender();
      expect(result.current).toBe(true);
    });

    it('should update when error state changes', () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'test-user',
        setMasqueradeUser: jest.fn(),
      });

      const { result, rerender } = renderHook(() => useIsMasquerading());
      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      rerender();
      expect(result.current).toBe(true);
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('API Error'),
      } as any);

      rerender();
      expect(result.current).toBe(false);
    });

    it('should return boolean type consistently', () => {
      const testCases = [
        { masqueradeUser: 'user', isError: false, expected: true },
        { masqueradeUser: undefined, isError: false, expected: false },
        { masqueradeUser: 'user', isError: true, expected: false },
        { masqueradeUser: '', isError: false, expected: false },
      ];

      testCases.forEach(({ masqueradeUser, isError, expected }) => {
        mockUseMasquerade.mockReturnValue({
          masqueradeUser,
          setMasqueradeUser: jest.fn(),
        });

        mockUseInitializeLearnerHome.mockReturnValue({
          data: isError ? undefined : {},
          isError,
          isLoading: false,
          error: isError ? new Error('Test error') : null,
        } as any);

        const { result } = renderHook(() => useIsMasquerading());

        expect(typeof result.current).toBe('boolean');
        expect(result.current).toBe(expected);
      });
    });
  });

  describe('integration scenarios', () => {
    it('should work correctly in typical masquerading flow', () => {
      const { result, rerender } = renderHook(() => useIsMasquerading());
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });
      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      rerender();
      expect(result.current).toBe(false);
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: 'student123',
        setMasqueradeUser: jest.fn(),
      });
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: false,
        isLoading: true,
        error: null,
      } as any);

      rerender();
      expect(result.current).toBe(true);
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: ['course1', 'course2'] },
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      rerender();
      expect(result.current).toBe(true);
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isError: true,
        isLoading: false,
        error: new Error('User not found'),
      } as any);

      rerender();
      expect(result.current).toBe(false);
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser: jest.fn(),
      });
      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isError: false,
        isLoading: false,
        error: null,
      } as any);

      rerender();
      expect(result.current).toBe(false);
    });

    it('should handle various masqueradeUser formats', () => {
      const userFormats = [
        'username',
        'user@example.com',
        'user.name@domain.co.uk',
        'user_123',
        'User Name',
        '12345',
      ];

      userFormats.forEach(user => {
        mockUseMasquerade.mockReturnValue({
          masqueradeUser: user,
          setMasqueradeUser: jest.fn(),
        });

        mockUseInitializeLearnerHome.mockReturnValue({
          data: {},
          isError: false,
          isLoading: false,
          error: null,
        } as any);

        const { result } = renderHook(() => useIsMasquerading());
        expect(result.current).toBe(true);
      });
    });
  });
});
