import { breakpoints, useWindowSize } from '@edx/paragon';

export const useIsMediumScreen = () => {
  const { width } = useWindowSize();
  return width >= breakpoints.medium.minWidth && width < breakpoints.medium.maxWidth;
};

export default useIsMediumScreen;
