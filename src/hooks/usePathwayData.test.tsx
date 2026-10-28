import { renderHook } from '@testing-library/react';

import {
  useInitializeLearnerHome,
  usePathwaysByCategory as usePathwaysByCategoryQuery,
  usePathwaysByCourse,
} from '@src/data/hooks';
import {
  dataEngineering,
  machineLearning,
  pathwaysByCategory,
} from '@src/data/services/lms/__mocks__/pathways';
import useCourseData from './useCourseData';
import { useCoursePathways, usePathwaysByCategory } from './usePathwayData';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
  usePathwaysByCategory: jest.fn(),
  usePathwaysByCourse: jest.fn(),
}));

jest.mock('./useCourseData', () => jest.fn());

const mockUseInitializeLearnerHome = useInitializeLearnerHome as jest.Mock;
const mockUsePathwaysByCategoryQuery = usePathwaysByCategoryQuery as jest.Mock;
const mockUsePathwaysByCourse = usePathwaysByCourse as jest.Mock;
const mockUseCourseData = useCourseData as jest.Mock;

describe('usePathwayData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePathwaysByCategory', () => {
    it('returns the pathways grouped by category', () => {
      mockUsePathwaysByCategoryQuery.mockReturnValue({ data: pathwaysByCategory });
      const { result } = renderHook(() => usePathwaysByCategory());
      expect(result.current).toEqual(pathwaysByCategory);
    });

    it('returns an empty list while the pathways are loading', () => {
      mockUsePathwaysByCategoryQuery.mockReturnValue({ data: undefined });
      const { result } = renderHook(() => usePathwaysByCategory());
      expect(result.current).toEqual([]);
    });
  });

  describe('useCoursePathways', () => {
    beforeEach(() => {
      mockUseInitializeLearnerHome.mockReturnValue({
        data: {
          courses: [
            { courseRun: { courseId: 'course-1' } },
            { courseRun: { courseId: 'course-2' } },
            { courseRun: null },
          ],
        },
      });
      mockUsePathwaysByCourse.mockReturnValue({
        data: { 'course-1': [dataEngineering, machineLearning] },
      });
      mockUseCourseData.mockReturnValue({ courseRun: { courseId: 'course-1' } });
    });

    it('requests the pathways of every course in the dashboard', () => {
      renderHook(() => useCoursePathways('card-1'));
      expect(mockUsePathwaysByCourse).toHaveBeenCalledWith(['course-1', 'course-2']);
    });

    it('returns the pathways of the card course', () => {
      const { result } = renderHook(() => useCoursePathways('card-1'));
      expect(mockUseCourseData).toHaveBeenCalledWith('card-1');
      expect(result.current).toEqual([dataEngineering, machineLearning]);
    });

    it('returns an empty list when the course has no pathways', () => {
      mockUseCourseData.mockReturnValue({ courseRun: { courseId: 'course-2' } });
      const { result } = renderHook(() => useCoursePathways('card-2'));
      expect(result.current).toEqual([]);
    });

    it('returns an empty list when the card has no course run', () => {
      mockUseCourseData.mockReturnValue(undefined);
      const { result } = renderHook(() => useCoursePathways('card-3'));
      expect(result.current).toEqual([]);
    });

    it('returns an empty list while the pathways are loading', () => {
      mockUsePathwaysByCourse.mockReturnValue({ data: undefined });
      const { result } = renderHook(() => useCoursePathways('card-1'));
      expect(result.current).toEqual([]);
    });

    it('requests no courses while the dashboard data is loading', () => {
      mockUseInitializeLearnerHome.mockReturnValue({ data: undefined });
      renderHook(() => useCoursePathways('card-1'));
      expect(mockUsePathwaysByCourse).toHaveBeenCalledWith([]);
    });
  });
});
