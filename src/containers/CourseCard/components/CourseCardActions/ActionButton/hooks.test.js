import { useWindowSize, breakpoints } from '@openedx/paragon';
import useIsCollapsed from './hooks';

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
  breakpoints: {
    extraSmall: {
      minWidth: 0,
      maxWidth: 575,
    },
    small: {
      minWidth: 576,
      maxWidth: 767,
    },
    medium: {
      minWidth: 768,
      maxWidth: 991,
    },
    large: {
      minWidth: 992,
      maxWidth: 1199,
    },
    extraLarge: {
      minWidth: 1200,
      maxWidth: 100000,
    },
  },
}));

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
