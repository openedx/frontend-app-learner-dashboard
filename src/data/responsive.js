import { useWindowSize, breakpoints } from '@edx/paragon';
import { StrictDict } from 'utils';

const createResponsive = (fn) => () => {
  const { width } = useWindowSize();
  return fn(width);
};

export const isDesktopSize = createResponsive(
  (width) => width >= breakpoints.large.minWidth,
);

// Beware of using isPadSize() for styling. When the screen resizes pass the
// breakpoint, the screen will flash between the two styles. This is why it is
// recommened isDesktopSize() or isMobileSize() be used instead.
export const isIpadSize = createResponsive(
  (width) => width >= breakpoints.medium.minWidth && width < breakpoints.large.minWidth,
);

export const isMobileSize = createResponsive(
  (width) => width < breakpoints.medium.minWidth,
);

export default StrictDict({
  isDesktopSize,
  isIpadSize,
  isMobileSize,
});
