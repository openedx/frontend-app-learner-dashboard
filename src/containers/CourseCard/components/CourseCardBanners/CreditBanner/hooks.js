import { useMemo } from 'react';
import { useInitializeLearnerHome } from 'data/hooks';
import { StrictDict } from 'utils';

import { useCourseData } from 'hooks';

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
  const courseData = useCourseData(cardId);
  const { data: learnerHomeData } = useInitializeLearnerHome();
  const supportEmail = useMemo(
    () => (learnerHomeData?.platformSettings?.supportEmail),
    [learnerHomeData],
  );

  const credit = useMemo(() => {
    const creditData = courseData?.credit;
    if (!creditData || Object.keys(creditData).length === 0) {
      return { isEligible: false };
    }
    return {
      isEligible: true,
      providerStatusUrl: creditData.providerStatusUrl,
      providerName: creditData.providerName,
      providerId: creditData.providerId,
      error: creditData.error,
      purchased: creditData.purchased,
      requestStatus: creditData.requestStatus,
    };
  }, [courseData]);
  if (!credit.isEligible || !courseData?.credit?.isEligible) { return null; }

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
