import { useContext, useState } from 'react';

import GlobalDataContext from '../../../data/contexts/GlobalDataContext';
import { StrictDict } from '../../../utils';
import { apiHooks } from '../../../hooks';

import * as module from './hooks';

export const state = StrictDict({
  showPageBanner: (val) => useState(val), // eslint-disable-line
  showConfirmModal: (val) => useState(val), // eslint-disable-line
});

export const useConfirmEmailBannerData = () => {
  const { emailConfirmation } = useContext(GlobalDataContext);
  const { isNeeded } = emailConfirmation;
  const [showPageBanner, setShowPageBanner] = module.state.showPageBanner(isNeeded);
  const [showConfirmModal, setShowConfirmModal] = module.state.showConfirmModal(false);
  const closePageBanner = () => setShowPageBanner(false);
  const closeConfirmModal = () => setShowConfirmModal(false);
  const openConfirmModal = () => setShowConfirmModal(true);
  const sendConfirmEmail = apiHooks.useSendConfirmEmail();

  const openConfirmModalButtonClick = () => {
    sendConfirmEmail();
    openConfirmModal();
    closePageBanner();
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
