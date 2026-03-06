import { renderHook } from '@testing-library/react';
import { useInitializeLearnerHome } from '@src/data/hooks';
import useCourseData from './useCourseData';

jest.mock('@src/data/hooks');

const mockUseInitializeLearnerHome = useInitializeLearnerHome as jest.MockedFunction<typeof useInitializeLearnerHome>;

describe('useCourseData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCoursesByCardId = {
    'course-1': {
      cardId: 'course-1',
      courseName: 'Introduction to React',
      courseNumber: 'CS101',
      enrollment: { isEnrolled: true },
    },
    'course-2': {
      cardId: 'course-2',
      courseName: 'Advanced JavaScript',
      courseNumber: 'CS201',
      enrollment: { isEnrolled: true },
    },
    'course-3': {
      cardId: 'course-3',
      courseName: 'Data Structures',
      courseNumber: 'CS301',
      enrollment: { isEnrolled: false },
    },
  };

  describe('successful data retrieval', () => {
    beforeEach(() => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: [], coursesByCardId: mockCoursesByCardId },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
    });

    it('should return correct course data for existing cardId', () => {
      const { result } = renderHook(() => useCourseData('course-1'));
      expect(result.current).toEqual(mockCoursesByCardId['course-1']);
    });

    it('should return correct course data for different cardId', () => {
      const { result } = renderHook(() => useCourseData('course-2'));
      expect(result.current).toEqual(mockCoursesByCardId['course-2']);
    });

    it('should return undefined for non-existing cardId', () => {
      const { result } = renderHook(() => useCourseData('non-existing-course'));
      expect(result.current).toBeUndefined();
    });
  });

  describe('no data scenarios', () => {
    it('should handle undefined data gracefully', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useCourseData('course-1'));
      expect(result.current).toBeUndefined();
    });

    it('should handle null data gracefully', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useCourseData('course-1'));
      expect(result.current).toBeUndefined();
    });

    it('should handle missing coursesByCardId property', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: [] },
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useCourseData('course-1'));
      expect(result.current).toBeUndefined();
    });
  });

  describe('loading and error states', () => {
    it('should handle loading state', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useCourseData('course-1'));
      expect(result.current).toBeUndefined();
    });

    it('should handle error state', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
      } as any);

      const { result } = renderHook(() => useCourseData('course-1'));
      expect(result.current).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: [], coursesByCardId: mockCoursesByCardId },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
    });

    it('should handle empty string cardId', () => {
      const { result } = renderHook(() => useCourseData(''));
      expect(result.current).toBeUndefined();
    });

    it('should handle null cardId', () => {
      const { result } = renderHook(() => useCourseData(null as any));
      expect(result.current).toBeUndefined();
    });

    it('should handle undefined cardId', () => {
      const { result } = renderHook(() => useCourseData(undefined as any));
      expect(result.current).toBeUndefined();
    });
  });
});
