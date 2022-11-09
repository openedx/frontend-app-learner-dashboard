import { useSelector, useDispatch } from 'react-redux';

import { actions as appActions } from './app/reducer';
import appSelectors from './app/selectors';
import requestSelectors from './requests/selectors';
import * as module from './hooks';

const { courseCard } = appSelectors;

export const usePageNumber = () => useSelector(appSelectors.pageNumber);
export const useEmailConfirmationData = () => useSelector(appSelectors.emailConfirmation);
export const useEnterpriseDashboardData = () => useSelector(appSelectors.enterpriseDashboard);
export const usePlatformSettingsData = () => useSelector(appSelectors.platformSettings);
export const useSelectSessionModalData = () => useSelector(appSelectors.selectSessionModal);
export const useSocialSettingsData = () => useSelector(appSelectors.socialSettingsData);

export const useHasCourses = () => useSelector(appSelectors.hasCourses);
export const useHasAvailableDashboards = () => useSelector(appSelectors.hasAvailableDashboards);
export const useCurrentCourseList = (opts) => useSelector(
  state => appSelectors.currentList(state, opts),
);
export const useShowSelectSessionModal = () => useSelector(appSelectors.showSelectSessionModal);

// eslint-disable-next-line
export const useCourseCardData = (selector) => (cardId) => useSelector(
  (state) => selector(state, cardId),
);

export const useCardCertificateData = useCourseCardData(courseCard.certificate);
export const useCardCourseData = useCourseCardData(courseCard.course);
export const useCardCourseRunData = useCourseCardData(courseCard.courseRun);
export const useCardEnrollmentData = useCourseCardData(courseCard.enrollment);
export const useCardEntitlementData = useCourseCardData(courseCard.entitlement);
export const useCardGradeData = useCourseCardData(courseCard.gradeData);
export const useCardProviderData = useCourseCardData(courseCard.courseProvider);
export const useCardRelatedProgramsData = useCourseCardData(courseCard.relatedPrograms);

export const useCardSocialSettingsData = (cardId) => {
  const { socialShareUrl } = module.useCardCourseData(cardId);
  const socialShareSettings = useSelector(appSelectors.socialShareSettings);
  if (!socialShareSettings) {
    return {
      facebook: { isEnabled: false, shareUrl: '' },
      twitter: { isEnabled: false, shareUrl: '' },
    };
  }
  return {
    facebook: {
      isEnabled: socialShareSettings.facebook.isEnabled,
      shareUrl: `${socialShareUrl}?${socialShareSettings.facebook.utmParams}`,
    },
    twitter: {
      isEnabled: socialShareSettings.twitter.isEnabled,
      shareUrl: `${socialShareUrl}?${socialShareSettings.twitter.utmParams}`,
    },
  };
};

export const useUpdateSelectSessionModalCallback = (cardId) => {
  const dispatch = useDispatch();
  return () => dispatch(appActions.updateSelectSessionModal(cardId));
};

export const useMasqueradeData = () => useSelector(requestSelectors.masquerade);

export const useRequestIsPending = (requestName) => useSelector(requestSelectors.isPending(requestName));
export const useRequestIsFailed = (requestName) => useSelector(requestSelectors.isFailed(requestName));
