import { useWindowSize, breakpoints } from '@edx/paragon';
import useIsCollapsed from './hooks';

describe('useIsCollapsed', () => {
  it('returns true only when it is between medium and small', () => {
    // make sure all three breakpoints gap is large enough for test
    expect(
      (breakpoints.large.maxWidth - 1)
      > (breakpoints.medium.maxWidth - 1)
      && (breakpoints.medium.maxWidth - 1)
      > (breakpoints.small.maxWidth - 1),
    ).toBe(true);

    useWindowSize.mockReturnValue({ width: breakpoints.large.maxWidth - 1 });
    expect(useIsCollapsed()).toEqual(false);
    useWindowSize.mockReturnValue({ width: breakpoints.medium.maxWidth - 1 });
    expect(useIsCollapsed()).toEqual(true);
    useWindowSize.mockReturnValue({ width: breakpoints.small.maxWidth - 1 });
    expect(useIsCollapsed()).toEqual(false);
  });
});
