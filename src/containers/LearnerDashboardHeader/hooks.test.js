import { useWindowSize, breakpoints } from '@edx/paragon';
import { useIsCollapsed } from './hooks';

describe('LearnerDashboardHeader hooks', () => {
  describe('useIsCollapsed', () => {
    test('large screen is not collapsed', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.maxWidth + 1 });
      expect(useIsCollapsed()).toEqual(false);
    });
    test('small screen is collapsed', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.maxWidth - 1 });
      expect(useIsCollapsed()).toEqual(true);
    });
  });
});
