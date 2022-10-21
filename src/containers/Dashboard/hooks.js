import React from 'react';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { useDispatch } from 'react-redux';
import { thunkActions } from 'data/redux';

export const useIsDashboardCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.large.maxWidth;
};

export const useInitializeDashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => { dispatch(thunkActions.app.initialize()); },
    [dispatch],
  );
};

export default {
  useIsDashboardCollapsed,
  useInitializeDashboard,
};
