import { useWindowSize, breakpoints } from '@openedx/paragon';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.medium.maxWidth && width > breakpoints.small.maxWidth;
};

export default useIsCollapsed;
