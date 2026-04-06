import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { FiltersProvider, useFilters } from './FiltersProvider';

describe('FiltersProvider and useFilters', () => {
  // eslint-disable-next-line func-names
  const createWrapper = () => function ({ children }: { children: React.ReactNode }) {
    return <FiltersProvider>{children}</FiltersProvider>;
  };

  describe('useFilters hook', () => {
    describe('initial state', () => {
      it('should return initial filters state', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        expect(result.current.filters).toEqual([]);
        expect(result.current.sortBy).toBe('enrolled');
        expect(result.current.pageNumber).toBe(1);
        expect(typeof result.current.setFilters).toBe('function');
        expect(typeof result.current.addFilter).toBe('function');
        expect(typeof result.current.removeFilter).toBe('function');
        expect(typeof result.current.clearFilters).toBe('function');
        expect(typeof result.current.setSortBy).toBe('function');
        expect(typeof result.current.setPageNumber).toBe('function');
      });

      it('should have all expected properties in context', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        const expectedProperties = [
          'filters',
          'sortBy',
          'pageNumber',
          'setFilters',
          'addFilter',
          'removeFilter',
          'clearFilters',
          'setSortBy',
          'setPageNumber',
        ];

        expectedProperties.forEach(prop => {
          expect(result.current).toHaveProperty(prop);
        });
      });
    });

    describe('error handling', () => {
      it('should throw error when used outside of provider', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
          renderHook(() => useFilters());
        }).toThrow('useFilters must be used within a FiltersProvider');

        consoleErrorSpy.mockRestore();
      });

      it('should throw error with correct message when context is null', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
          renderHook(() => useFilters());
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toBe('useFilters must be used within a FiltersProvider');
        }

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe('filters management', () => {
    describe('setFilters', () => {
      it('should set filters correctly', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        const testFilters = ['inProgress', 'upgraded'];

        act(() => {
          result.current.setFilters(testFilters);
        });

        expect(result.current.filters).toEqual(testFilters);
      });

      it('should handle single filter', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['notStarted']);
        });

        expect(result.current.filters).toEqual(['notStarted']);
      });

      it('should handle empty filters array', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });
        act(() => {
          result.current.setFilters(['inProgress', 'done']);
        });
        act(() => {
          result.current.setFilters([]);
        });

        expect(result.current.filters).toEqual([]);
      });

      it('should replace existing filters completely', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress']);
        });

        act(() => {
          result.current.setFilters(['done', 'upgraded']);
        });

        expect(result.current.filters).toEqual(['done', 'upgraded']);
      });

      it('should handle multiple filter types', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        const multipleFilters = [
          'inProgress',
          'notStarted',
          'done',
          'upgraded',
          'notEnrolled',
        ];

        act(() => {
          result.current.setFilters(multipleFilters);
        });

        expect(result.current.filters).toEqual(multipleFilters);
      });
    });

    describe('addFilter', () => {
      it('should add filter to empty filters array', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.addFilter('inProgress');
        });

        expect(result.current.filters).toEqual(['inProgress']);
      });

      it('should add filter to existing filters', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress']);
        });

        act(() => {
          result.current.addFilter('upgraded');
        });

        expect(result.current.filters).toEqual(['inProgress', 'upgraded']);
      });

      it('should add duplicate filters (no deduplication)', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.addFilter('inProgress');
        });

        act(() => {
          result.current.addFilter('inProgress');
        });

        expect(result.current.filters).toEqual(['inProgress', 'inProgress']);
      });

      it('should add multiple filters sequentially', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        const filtersToAdd = ['inProgress', 'upgraded', 'done'];

        filtersToAdd.forEach((filter, index) => {
          act(() => {
            result.current.addFilter(filter);
          });
          expect(result.current.filters).toHaveLength(index + 1);
          expect(result.current.filters).toContain(filter);
        });

        expect(result.current.filters).toEqual(filtersToAdd);
      });
    });

    describe('removeFilter', () => {
      it('should remove specific filter from filters array', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress', 'upgraded', 'done']);
        });

        act(() => {
          result.current.removeFilter('upgraded');
        });

        expect(result.current.filters).toEqual(['inProgress', 'done']);
      });

      it('should handle removing non-existent filter', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress', 'upgraded']);
        });

        act(() => {
          result.current.removeFilter('nonExistent');
        });

        expect(result.current.filters).toEqual(['inProgress', 'upgraded']);
      });

      it('should remove filter from empty array', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.removeFilter('inProgress');
        });

        expect(result.current.filters).toEqual([]);
      });

      it('should remove last filter leaving empty array', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress']);
        });

        act(() => {
          result.current.removeFilter('inProgress');
        });

        expect(result.current.filters).toEqual([]);
      });
    });

    describe('clearFilters', () => {
      it('should clear all filters', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress', 'upgraded', 'done']);
        });

        act(() => {
          result.current.clearFilters();
        });

        expect(result.current.filters).toEqual([]);
      });

      it('should clear filters when already empty', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.clearFilters();
        });

        expect(result.current.filters).toEqual([]);
      });

      it('should not affect sortBy and pageNumber when clearing filters', () => {
        const { result } = renderHook(() => useFilters(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setFilters(['inProgress']);
          result.current.setSortBy('title');
          result.current.setPageNumber(3);
        });

        act(() => {
          result.current.clearFilters();
        });

        expect(result.current.filters).toEqual([]);
        expect(result.current.sortBy).toBe('title');
        expect(result.current.pageNumber).toBe(3);
      });
    });
  });

  describe('sortBy management', () => {
    it('should have initial sortBy as "enrolled"', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      expect(result.current.sortBy).toBe('enrolled');
    });

    it('should set sortBy to "title"', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setSortBy('title');
      });

      expect(result.current.sortBy).toBe('title');
    });

    it('should set sortBy to "enrolled"', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setSortBy('title');
      });

      act(() => {
        result.current.setSortBy('enrolled');
      });

      expect(result.current.sortBy).toBe('enrolled');
    });

    it('should change sortBy options multiple times', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const sortSequence = ['title', 'enrolled', 'title', 'enrolled'] as const;

      sortSequence.forEach(sortOption => {
        act(() => {
          result.current.setSortBy(sortOption);
        });
        expect(result.current.sortBy).toBe(sortOption);
      });
    });
  });

  describe('pageNumber management', () => {
    it('should have initial pageNumber as 1', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      expect(result.current.pageNumber).toBe(1);
    });

    it('should set pageNumber correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setPageNumber(5);
      });

      expect(result.current.pageNumber).toBe(5);
    });

    it('should handle zero and negative page numbers', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setPageNumber(0);
      });
      expect(result.current.pageNumber).toBe(0);

      act(() => {
        result.current.setPageNumber(-1);
      });
      expect(result.current.pageNumber).toBe(-1);
    });

    it('should handle large page numbers', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setPageNumber(999999);
      });

      expect(result.current.pageNumber).toBe(999999);
    });

    it('should change pageNumber multiple times', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const pageSequence = [2, 10, 1, 5, 3];

      pageSequence.forEach(page => {
        act(() => {
          result.current.setPageNumber(page);
        });
        expect(result.current.pageNumber).toBe(page);
      });
    });
  });

  describe('reducer functionality', () => {
    it('should handle SET_FILTERS action correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const testFilters = ['filter1', 'filter2'];

      act(() => {
        result.current.setFilters(testFilters);
      });

      expect(result.current.filters).toEqual(testFilters);
    });

    it('should handle ADD_FILTER action correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.addFilter('testFilter');
      });

      expect(result.current.filters).toEqual(['testFilter']);
    });

    it('should handle REMOVE_FILTER action correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setFilters(['filter1', 'filter2', 'filter3']);
      });

      act(() => {
        result.current.removeFilter('filter2');
      });

      expect(result.current.filters).toEqual(['filter1', 'filter3']);
    });

    it('should handle CLEAR_FILTERS action correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setFilters(['filter1', 'filter2']);
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filters).toEqual([]);
    });

    it('should handle SET_SORT_BY action correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setSortBy('title');
      });

      expect(result.current.sortBy).toBe('title');
    });

    it('should handle SET_PAGE_NUMBER action correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setPageNumber(10);
      });

      expect(result.current.pageNumber).toBe(10);
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete state management workflow', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });
      expect(result.current.filters).toEqual([]);
      expect(result.current.sortBy).toBe('enrolled');
      expect(result.current.pageNumber).toBe(1);
      act(() => {
        result.current.addFilter('inProgress');
        result.current.addFilter('upgraded');
      });
      expect(result.current.filters).toEqual(['inProgress', 'upgraded']);
      act(() => {
        result.current.setSortBy('title');
        result.current.setPageNumber(2);
      });
      expect(result.current.sortBy).toBe('title');
      expect(result.current.pageNumber).toBe(2);
      act(() => {
        result.current.removeFilter('inProgress');
      });
      expect(result.current.filters).toEqual(['upgraded']);
      act(() => {
        result.current.setFilters(['done', 'notEnrolled']);
      });
      expect(result.current.filters).toEqual(['done', 'notEnrolled']);
      act(() => {
        result.current.clearFilters();
      });
      expect(result.current.filters).toEqual([]);
      expect(result.current.sortBy).toBe('title');
      expect(result.current.pageNumber).toBe(2);
    });

    it('should handle realistic course filtering workflow', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });
      expect(result.current.pageNumber).toBe(1);
      act(() => {
        result.current.addFilter('inProgress');
      });
      expect(result.current.filters).toContain('inProgress');
      act(() => {
        result.current.addFilter('upgraded');
      });
      expect(result.current.filters).toEqual(['inProgress', 'upgraded']);
      act(() => {
        result.current.setSortBy('title');
      });
      expect(result.current.sortBy).toBe('title');
      act(() => {
        result.current.setPageNumber(2);
      });
      expect(result.current.pageNumber).toBe(2);
      act(() => {
        result.current.removeFilter('inProgress');
      });
      expect(result.current.filters).toEqual(['upgraded']);
      act(() => {
        result.current.clearFilters();
      });
      expect(result.current.filters).toEqual([]);
      expect(result.current.sortBy).toBe('title');
      expect(result.current.pageNumber).toBe(2);
    });

    it('should handle multiple providers independently', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();

      const { result: result1 } = renderHook(() => useFilters(), { wrapper: wrapper1 });
      const { result: result2 } = renderHook(() => useFilters(), { wrapper: wrapper2 });
      act(() => {
        result1.current.addFilter('filter1');
        result1.current.setSortBy('title');
        result1.current.setPageNumber(3);
      });

      act(() => {
        result2.current.addFilter('filter2');
        result2.current.setSortBy('enrolled');
        result2.current.setPageNumber(5);
      });
      expect(result1.current.filters).toEqual(['filter1']);
      expect(result1.current.sortBy).toBe('title');
      expect(result1.current.pageNumber).toBe(3);

      expect(result2.current.filters).toEqual(['filter2']);
      expect(result2.current.sortBy).toBe('enrolled');
      expect(result2.current.pageNumber).toBe(5);
    });
  });

  describe('provider functionality', () => {
    it('should provide context value correctly', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.filters).toBeDefined();
      expect(result.current.sortBy).toBeDefined();
      expect(result.current.pageNumber).toBeDefined();
      expect(typeof result.current.setFilters).toBe('function');
      expect(typeof result.current.addFilter).toBe('function');
      expect(typeof result.current.removeFilter).toBe('function');
      expect(typeof result.current.clearFilters).toBe('function');
      expect(typeof result.current.setSortBy).toBe('function');
      expect(typeof result.current.setPageNumber).toBe('function');
    });

    it('should handle provider re-renders without losing state', () => {
      const TestWrapper = ({ rerenderTrigger, children }: { rerenderTrigger: number; children: React.ReactNode }) => (
        <FiltersProvider>
          <div data-testid={`rerender-${rerenderTrigger}`}>
            {children}
          </div>
        </FiltersProvider>
      );

      const { result, rerender } = renderHook(() => useFilters(), {
        wrapper: ({ children }) => <TestWrapper rerenderTrigger={1}>{children}</TestWrapper>,
      });

      act(() => {
        result.current.setFilters(['persistentFilter']);
        result.current.setSortBy('title');
        result.current.setPageNumber(5);
      });

      rerender({ rerenderTrigger: 2 });
      expect(result.current.filters).toEqual(['persistentFilter']);
      expect(result.current.sortBy).toBe('title');
      expect(result.current.pageNumber).toBe(5);
    });

    it('should maintain function referential stability', () => {
      const { result, rerender } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const initialFunctions = {
        setFilters: result.current.setFilters,
        addFilter: result.current.addFilter,
        removeFilter: result.current.removeFilter,
        clearFilters: result.current.clearFilters,
        setSortBy: result.current.setSortBy,
        setPageNumber: result.current.setPageNumber,
      };
      rerender();

      expect(result.current.setFilters).toBe(initialFunctions.setFilters);
      expect(result.current.addFilter).toBe(initialFunctions.addFilter);
      expect(result.current.removeFilter).toBe(initialFunctions.removeFilter);
      expect(result.current.clearFilters).toBe(initialFunctions.clearFilters);
      expect(result.current.setSortBy).toBe(initialFunctions.setSortBy);
      expect(result.current.setPageNumber).toBe(initialFunctions.setPageNumber);
    });
  });

  describe('memoization behavior', () => {
    it('should memoize context value when state does not change', () => {
      const { result, rerender } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const firstContextValue = result.current;
      rerender();
      expect(result.current.setFilters).toBe(firstContextValue.setFilters);
      expect(result.current.addFilter).toBe(firstContextValue.addFilter);
      expect(result.current.removeFilter).toBe(firstContextValue.removeFilter);
      expect(result.current.clearFilters).toBe(firstContextValue.clearFilters);
      expect(result.current.setSortBy).toBe(firstContextValue.setSortBy);
      expect(result.current.setPageNumber).toBe(firstContextValue.setPageNumber);
    });

    it('should update memoized value when state changes', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const initialValue = result.current;

      act(() => {
        result.current.addFilter('newFilter');
      });
      expect(result.current.filters).not.toEqual(initialValue.filters);
      expect(result.current.filters).toContain('newFilter');
    });
  });

  describe('edge cases and type safety', () => {
    it('should handle empty string filters', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.addFilter('');
      });

      expect(result.current.filters).toEqual(['']);
    });

    it('should handle special character filters', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });

      const specialFilters = ['filter-with-dash', 'filter_with_underscore', 'filter with space', 'filter!@#$%'];

      specialFilters.forEach(filter => {
        act(() => {
          result.current.addFilter(filter);
        });
      });

      expect(result.current.filters).toEqual(specialFilters);
    });

    it('should maintain type safety for SortOption', () => {
      const { result } = renderHook(() => useFilters(), {
        wrapper: createWrapper(),
      });
      const validSortOptions: Array<'enrolled' | 'title'> = ['enrolled', 'title'];

      validSortOptions.forEach(option => {
        act(() => {
          result.current.setSortBy(option);
        });
        expect(result.current.sortBy).toBe(option);
      });
    });
  });
});
