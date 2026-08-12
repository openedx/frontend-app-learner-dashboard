import { renderHook } from '@testing-library/react';
import { useWindowSize } from '@openedx/paragon';
import { useIsCollapsed } from './hooks';

jest.mock('@openedx/paragon', () => ({
  useWindowSize: jest.fn(),
  breakpoints: {
    small: {
      maxWidth: 576,
    },
  },
}));

describe('useIsCollapsed', () => {
  it('returns true when window width is smaller than the small breakpoint', () => {
    useWindowSize.mockReturnValue({ width: 500 });
    const { result } = renderHook(() => useIsCollapsed());
    expect(result.current).toBe(true);
  });

  it('returns false when window width is larger than the small breakpoint', () => {
    useWindowSize.mockReturnValue({ width: 800 });
    const { result } = renderHook(() => useIsCollapsed());
    expect(result.current).toBe(false);
  });
});
