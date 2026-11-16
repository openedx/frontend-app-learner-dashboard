import { useState } from 'react';

import { useInitializeLearnerHome, useSendConfirmEmail } from '@src/data/hooks';
import urls from '@src/data/services/lms/urls';

export const useConfirmEmailBannerData = () => {
  const { data: learnerData } = useInitializeLearnerHome();
  const isNeeded = learnerData?.emailConfirmation?.isNeeded || false;
  const sendEmailUrl = learnerData?.emailConfirmation?.sendEmailUrl || urls.sendActivationEmail();
  const { mutate: sendConfirmEmail } = useSendConfirmEmail(sendEmailUrl);
  const [isPageBannerDismissed, setIsPageBannerDismissed] = useState(false);
  const showPageBanner = isNeeded && !isPageBannerDismissed;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const closePageBanner = () => setIsPageBannerDismissed(true);
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
