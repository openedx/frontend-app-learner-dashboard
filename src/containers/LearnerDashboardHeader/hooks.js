import React from 'react';
import { useWindowSize, breakpoints } from '@edx/paragon';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  const isCollapsed = React.useMemo(() => (width <= breakpoints.large.maxWidth), [width]);
  return isCollapsed;
};

export default { useIsCollapsed };
