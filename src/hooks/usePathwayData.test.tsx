import { renderHook } from '@testing-library/react';

import { usePathwaysByCategory as usePathwaysByCategoryQuery } from '@src/data/hooks';
import { pathwaysByCategory } from '@src/data/services/lms/__mocks__/pathways';
import { usePathwaysByCategory } from './usePathwayData';

jest.mock('@src/data/hooks', () => ({
  usePathwaysByCategory: jest.fn(),
}));

const mockUsePathwaysByCategoryQuery = usePathwaysByCategoryQuery as jest.Mock;

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
});
