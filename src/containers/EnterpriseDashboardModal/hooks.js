import React from 'react';

import { StrictDict } from 'utils';
import track from 'tracking';
import { reduxHooks } from 'hooks';

import * as module from './hooks';

export const state = StrictDict({
  showModal: (val) => React.useState(val), // eslint-disable-line
});

const { modalOpened, modalClosed, modalCTAClicked } = track.enterpriseDashboard;

export const useEnterpriseDashboardHook = () => {
  const [showModal, setShowModal] = module.state.showModal(true);
  const dashboard = reduxHooks.useEnterpriseDashboardData();

  const trackOpened = modalOpened(dashboard.enterpriseUUID);
  const trackClose = modalClosed(dashboard.enterpriseUUID, 'Cancel button');
  const trackEscape = modalClosed(dashboard.enterpriseUUID, 'Escape');

  const handleCTAClick = modalCTAClicked(dashboard.enterpriseUUID, dashboard.url);
  const handleClose = () => {
    trackClose();
    setShowModal(false);
  };
  const handleEscape = () => {
    trackEscape();
    setShowModal(false);
  };

  React.useEffect(() => {
    if (dashboard && dashboard.label) {
      trackOpened();
    }
  }, []); // eslint-disable-line

  return {
    showModal,
    handleCTAClick,
    handleClose,
    handleEscape,
    dashboard,
  };
};

export default useEnterpriseDashboardHook;
