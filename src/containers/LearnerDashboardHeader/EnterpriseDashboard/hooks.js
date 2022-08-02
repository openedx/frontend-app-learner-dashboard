import React from 'react';
import { hooks as appHooks } from 'data/redux';
import { StrictDict } from 'utils';
import * as module from './hooks';

export const state = StrictDict({
  showDialog: (val) => React.useState(val), // eslint-disable-line
  selectedItem: (val) => React.useState(val), // eslint-disable-line
});

export const useEnterpriseDashboardHook = () => {
  const { availableDashboards, mostRecentDashboard } = appHooks.useEnterpriseDashboardData();
  const [showDialog, setShowDialog] = module.state.showDialog(false);
  const [selectedItem, setSelectedItem] = module.state.selectedItem({});

  const beginSelectDashboardItem = (val) => () => {
    setSelectedItem(val);
    setShowDialog(true);
  };

  const cancelSelectDashboardItem = () => {
    setSelectedItem({});
    setShowDialog(false);
  };

  return {
    availableDashboards,
    mostRecentDashboard,
    showDialog,

    selectedItem,
    beginSelectDashboardItem,
    cancelSelectDashboardItem,
  };
};

export default useEnterpriseDashboardHook;
