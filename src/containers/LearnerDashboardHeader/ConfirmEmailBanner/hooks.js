import React from 'react';

import { StrictDict } from 'utils';
import { hooks as appHooks, thunkActions } from 'data/redux';

import { useDispatch } from 'react-redux';

import * as module from './hooks';

export const state = StrictDict({
  showPageBanner: (val) => React.useState(val), // eslint-disable-line
  showConfirmModal: (val) => React.useState(val), // eslint-disable-line
});

export const useConfirmEmailBannerData = () => {
  const dispatch = useDispatch();
  const { isNeeded } = appHooks.useEmailConfirmationData();
  const [showPageBanner, setShowPageBanner] = module.state.showPageBanner(isNeeded);
  const [showConfirmModal, setShowConfirmModal] = module.state.showConfirmModal(false);
  const closePageBanner = () => setShowPageBanner(false);
  const closeConfirmModal = () => setShowConfirmModal(false);
  const openConfirmModal = () => setShowConfirmModal(true);

  const openConfirmModalButtonClick = () => {
    dispatch(thunkActions.app.sendConfirmEmail());
    openConfirmModal();
  };

  const userConfirmEmailButtonClick = () => {
    closeConfirmModal();
    closePageBanner();
  };
  return {
    isNeeded,
    showPageBanner,
    closePageBanner,
    showConfirmModal,
    closeConfirmModal,
    openConfirmModalButtonClick,
    userConfirmEmailButtonClick,
  };
};

export default useConfirmEmailBannerData;
