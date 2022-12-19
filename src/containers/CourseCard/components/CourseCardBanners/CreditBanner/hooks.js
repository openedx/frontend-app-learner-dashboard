import { StrictDict } from 'utils';
import { hooks as appHooks } from 'data/redux';

import ApprovedContent from './views/ApprovedContent';
import EligibleContent from './views/EligibleContent';
import MustRequestContent from './views/MustRequestContent';
import PendingContent from './views/PendingContent';
import RejectedContent from './views/RejectedContent';

export const statusComponents = StrictDict({
  pending: PendingContent,
  approved: ApprovedContent,
  rejected: RejectedContent,
});

export const useCreditBannerData = (cardId) => {
  const credit = appHooks.useCardCreditData(cardId);
  const { supportEmail } = appHooks.usePlatformSettingsData();
  if (!credit.isEligible) { return null; }

  const { error, purchased, requestStatus } = credit;
  let ContentComponent = EligibleContent;
  if (purchased) {
    if (requestStatus == null) {
      ContentComponent = MustRequestContent;
    } else if (Object.keys(statusComponents).includes(requestStatus)) {
      ContentComponent = statusComponents[requestStatus];
    }
    // Current behavior is to show Elligible State if unknown request status is returned
  }
  return {
    ContentComponent,
    error,
    supportEmail,
  };
};

export default {
  useCreditBannerData,
};
