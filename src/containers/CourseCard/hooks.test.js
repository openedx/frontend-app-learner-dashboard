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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when window width is smaller than small breakpoint', () => {
    useWindowSize.mockReturnValue({ width: 500 });
    const { result } = renderHook(() => useIsCollapsed());
    expect(result.current).toBe(true);
    expect(useWindowSize).toHaveBeenCalled();
  });

  it('should return false when window width is larger than small breakpoint', () => {
    useWindowSize.mockReturnValue({ width: 800 });
    const { result } = renderHook(() => useIsCollapsed());
    expect(result.current).toBe(false);
    expect(useWindowSize).toHaveBeenCalled();
  });
});
