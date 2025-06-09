import React from 'react';
import { useWindowSize, breakpoints } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { apiHooks } from '../../hooks';
import { StrictDict } from '../../utils';
import appMessages from '../../messages';
import * as module from './hooks';

export const state = StrictDict({
  sidebarShowing: (val) => React.useState(val), // eslint-disable-line
});

export const useInitializeDashboard = () => {
  const initialize = apiHooks.useInitializeApp();
  React.useEffect(() => { initialize(); }, []); // eslint-disable-line
};

export const useDashboardMessages = () => {
  const { formatMessage } = useIntl();
  return {
    spinnerScreenReaderText: formatMessage(appMessages.loadingSR),
    pageTitle: formatMessage(appMessages.pageTitle),
  };
};

export const useDashboardLayoutData = () => {
  const { width } = useWindowSize();

  const [sidebarShowing, setSidebarShowing] = module.state.sidebarShowing(true);
  return {
    isDashboardCollapsed: width < breakpoints.large.maxWidth,
    sidebarShowing,
    setSidebarShowing,
  };
};

export default {
  useDashboardLayoutData,
  useInitializeDashboard,
  useDashboardMessages,
};
