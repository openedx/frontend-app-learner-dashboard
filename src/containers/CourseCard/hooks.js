import { useWindowSize, breakpoints } from '@openedx/paragon';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.small.maxWidth;
};
