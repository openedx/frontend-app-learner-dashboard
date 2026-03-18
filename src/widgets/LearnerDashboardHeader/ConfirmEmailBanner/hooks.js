import { useState } from 'react';

import { useInitializeLearnerHome, useSendConfirmEmail } from '@src/data/hooks';

export const useConfirmEmailBannerData = () => {
  const { data: learnerData } = useInitializeLearnerHome();
  const isNeeded = learnerData?.emailConfirmation?.isNeeded || false;
  const sendEmailUrl = learnerData?.emailConfirmation?.sendEmailUrl || '';
  const { mutate: sendConfirmEmail } = useSendConfirmEmail(sendEmailUrl);
  const [showPageBanner, setShowPageBanner] = useState(isNeeded);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
