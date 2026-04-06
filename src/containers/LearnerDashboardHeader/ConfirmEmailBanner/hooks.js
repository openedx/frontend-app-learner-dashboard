import React from 'react';

import { StrictDict } from 'utils';
import { useInitializeLearnerHome, useSendConfirmEmail } from 'data/hooks';

import * as module from './hooks';

export const state = StrictDict({
  showPageBanner: (val) => React.useState(val), // eslint-disable-line
  showConfirmModal: (val) => React.useState(val), // eslint-disable-line
});

export const useConfirmEmailBannerData = () => {
  const { data: learnerData } = useInitializeLearnerHome();
  const isNeeded = learnerData?.emailConfirmation?.isNeeded || false;
  const sendEmailUrl = learnerData?.emailConfirmation?.sendEmailUrl || '';
  const { mutate: sendConfirmEmail } = useSendConfirmEmail(sendEmailUrl);
  const [showPageBanner, setShowPageBanner] = module.state.showPageBanner(isNeeded);
  const [showConfirmModal, setShowConfirmModal] = module.state.showConfirmModal(false);
  const closePageBanner = () => setShowPageBanner(false);
  const closeConfirmModal = () => setShowConfirmModal(false);
  const openConfirmModal = () => setShowConfirmModal(true);

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
