import React from 'react';
import { hooks as appHooks } from 'data/redux';
import { StrictDict } from 'utils';
import * as module from './hooks';

export const state = StrictDict({
  showModal: (val) => React.useState(val), // eslint-disable-line
});

export const useEnterpriseDashboardHook = () => {
  const [showModal, setShowModal] = module.state.showModal(true);
  const { mostRecentDashboard } = appHooks.useEnterpriseDashboardData();
  const handleClick = () => setShowModal(false);
  return {
    showModal,
    handleClick,
    mostRecentDashboard,
  };
};

export default useEnterpriseDashboardHook;
