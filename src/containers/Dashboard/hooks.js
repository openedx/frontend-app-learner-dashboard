import React from 'react';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { thunkActions } from 'data/redux';

import appMessages from 'messages';

export const useIsDashboardCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.large.maxWidth;
};

export const useInitializeDashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => { dispatch(thunkActions.app.initialize()); }, [dispatch]);
};

export const useDashboardMessages = () => {
  const { formatMessage } = useIntl();
  return {
    spinnerScreenReaderText: formatMessage(appMessages.loadingSR),
    pageTitle: formatMessage(appMessages.pageTitle),
  };
};

export default {
  useIsDashboardCollapsed,
  useInitializeDashboard,
  useDashboardMessages,
};
