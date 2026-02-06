import { renderHook } from '@testing-library/react';
import { useInitializeLearnerHome } from 'data/hooks';
import { getTransformedCourseDataList } from 'utils/dataTransformers';
import useCourseData from './useCourseData';

jest.mock('data/hooks');
jest.mock('utils/dataTransformers');

const mockUseInitializeLearnerHome = useInitializeLearnerHome as jest.MockedFunction<typeof useInitializeLearnerHome>;
const mockGetTransformedCourseDataList = getTransformedCourseDataList as
    jest.MockedFunction<typeof getTransformedCourseDataList>;

describe('useCourseData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCourseData = [
    {
      cardId: 'course-1',
      courseName: 'Introduction to React',
      courseNumber: 'CS101',
      enrollment: { isEnrolled: true },
    },
    {
      cardId: 'course-2',
      courseName: 'Advanced JavaScript',
      courseNumber: 'CS201',
      enrollment: { isEnrolled: true },
    },
    {
      cardId: 'course-3',
      courseName: 'Data Structures',
      courseNumber: 'CS301',
      enrollment: { isEnrolled: false },
    },
  ];

  const mockRawCourses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' },
  ];

  describe('successful data retrieval', () => {
    beforeEach(() => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: mockRawCourses },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue(mockCourseData);
    });

    it('should return correct course data for existing cardId', () => {
      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toEqual(mockCourseData[0]);
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith(mockRawCourses);
    });

    it('should return correct course data for different cardId', () => {
      const { result } = renderHook(() => useCourseData('course-2'));

      expect(result.current).toEqual(mockCourseData[1]);
    });

    it('should return correct course data for last cardId', () => {
      const { result } = renderHook(() => useCourseData('course-3'));

      expect(result.current).toEqual(mockCourseData[2]);
    });

    it('should return undefined for non-existing cardId', () => {
      const { result } = renderHook(() => useCourseData('non-existing-course'));

      expect(result.current).toBeUndefined();
    });

    it('should call getTransformedCourseDataList with correct courses data', () => {
      renderHook(() => useCourseData('course-1'));

      expect(mockGetTransformedCourseDataList).toHaveBeenCalledTimes(1);
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith(mockRawCourses);
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
      mockGetTransformedCourseDataList.mockReturnValue([]);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith([]);
    });

    it('should handle null data gracefully', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue([]);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith([]);
    });

    it('should handle empty courses array', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: [] },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue([]);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith([]);
    });

    it('should handle missing courses property', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: {},
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue([]);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith([]);
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
      mockGetTransformedCourseDataList.mockReturnValue([]);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith([]);
    });

    it('should handle error state', () => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue([]);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith([]);
    });
  });

  describe('memoization behavior', () => {
    beforeEach(() => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: mockRawCourses },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue(mockCourseData);
    });

    it('should memoize result when cardId and courses data do not change', () => {
      const { result, rerender } = renderHook(
        ({ cardId }) => useCourseData(cardId),
        { initialProps: { cardId: 'course-1' } },
      );

      const firstResult = result.current;

      rerender({ cardId: 'course-1' });

      expect(result.current).toBe(firstResult);
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledTimes(1);
    });

    it('should recalculate when cardId changes', () => {
      const { result, rerender } = renderHook(
        ({ cardId }) => useCourseData(cardId),
        { initialProps: { cardId: 'course-1' } },
      );

      const firstResult = result.current;

      rerender({ cardId: 'course-2' });

      expect(result.current).not.toBe(firstResult);
      expect(result.current).toEqual(mockCourseData[1]);
    });

    it('should recalculate when courses data changes', () => {
      const { rerender } = renderHook(() => useCourseData('course-1'));

      const newMockRawCourses = [...mockRawCourses, { id: 4, name: 'Course 4' }];
      const newMockCourseData = [...mockCourseData, { cardId: 'course-4', courseName: 'New Course' }];

      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: newMockRawCourses },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue(newMockCourseData);

      rerender();

      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith(newMockRawCourses);
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: mockRawCourses },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
    });

    it('should handle empty string cardId', () => {
      mockGetTransformedCourseDataList.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseData(''));

      expect(result.current).toBeUndefined();
    });

    it('should handle null cardId', () => {
      mockGetTransformedCourseDataList.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseData(null as any));

      expect(result.current).toBeUndefined();
    });

    it('should handle undefined cardId', () => {
      mockGetTransformedCourseDataList.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseData(undefined as any));

      expect(result.current).toBeUndefined();
    });

    it('should handle when getTransformedCourseDataList returns null', () => {
      mockGetTransformedCourseDataList.mockReturnValue(null as any);

      const { result } = renderHook(() => useCourseData('course-1'));

      expect(result.current).toBeUndefined();
    });

    it('should handle when getTransformedCourseDataList throws error', () => {
      mockGetTransformedCourseDataList.mockImplementation(() => {
        throw new Error('Transformation error');
      });

      expect(() => {
        renderHook(() => useCourseData('course-1'));
      }).toThrow('Transformation error');
    });
  });

  describe('integration scenarios', () => {
    it('should work correctly with realistic course data', () => {
      const realisticRawCourses = [
        {
          course_id: 'course-v1:MITx+6.00.1x+2024',
          course_name: 'Introduction to Computer Science',
          course_number: '6.00.1x',
          enrollment: { is_active: true },
        },
      ];

      const realisticTransformedCourses = [
        {
          cardId: 'mit-cs-intro',
          courseName: 'Introduction to Computer Science',
          courseNumber: '6.00.1x',
          enrollment: { isActive: true },
          courseId: 'course-v1:MITx+6.00.1x+2024',
        },
      ];

      mockUseInitializeLearnerHome.mockReturnValue({
        data: { courses: realisticRawCourses },
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      mockGetTransformedCourseDataList.mockReturnValue(realisticTransformedCourses);

      const { result } = renderHook(() => useCourseData('mit-cs-intro'));

      expect(result.current).toEqual(realisticTransformedCourses[0]);
      expect(mockGetTransformedCourseDataList).toHaveBeenCalledWith(realisticRawCourses);
    });
  });
});
