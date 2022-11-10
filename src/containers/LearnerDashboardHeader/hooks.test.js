import { useWindowSize, breakpoints } from '@edx/paragon';
import { useIsCollapsed } from './hooks';

describe('LearnerDashboardHeader hooks', () => {
  describe('useIsCollapsed', () => {
    test('large screen is not collapsed', () => {
      const width = breakpoints.large.maxWidth + 1;
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.maxWidth + 1 });
      const { cb, prereqs } = useIsCollapsed().useMemo;
      expect(prereqs).toEqual([width]);
      expect(cb()).toEqual(false);
    });
    test('small screen is collapsed', () => {
      const width = breakpoints.large.maxWidth - 1;
      useWindowSize.mockReturnValueOnce({ width });
      const { cb, prereqs } = useIsCollapsed().useMemo;
      expect(prereqs).toEqual([width]);
      expect(cb()).toEqual(true);
    });
  });
});
