/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from 'react-redux';

import * as redux from 'data/redux';
import * as module from './app';

const selectors = redux.selectors.app;
const actions = redux.actions.app;

/** Simple Selectors **/
export const usePageNumber = () => useSelector(selectors.pageNumber);
export const useEmailConfirmationData = () => useSelector(selectors.emailConfirmation);
export const useEnterpriseDashboardData = () => useSelector(selectors.enterpriseDashboard);
export const usePlatformSettingsData = () => useSelector(selectors.platformSettings);
export const useSelectSessionModalData = () => useSelector(selectors.selectSessionModal);
export const useSocialShareSettings = () => useSelector(selectors.socialShareSettings);

/** global-level meta-selectors **/
export const useHasCourses = () => useSelector(selectors.hasCourses);
export const useHasAvailableDashboards = () => useSelector(selectors.hasAvailableDashboards);
export const useCurrentCourseList = (opts) => useSelector(
  state => selectors.currentList(state, opts),
);
export const useShowSelectSessionModal = () => useSelector(selectors.showSelectSessionModal);

// eslint-disable-next-line
export const useCourseCardData = (selector) => (cardId) => useSelector(
  (state) => selector(state, cardId),
);
/** Course Card selectors **/
const { courseCard } = selectors;
export const useCardCertificateData = useCourseCardData(courseCard.certificate);
export const useCardCourseData = useCourseCardData(courseCard.course);
export const useCardCourseRunData = useCourseCardData(courseCard.courseRun);
export const useCardCreditData = useCourseCardData(courseCard.credit);
export const useCardEnrollmentData = useCourseCardData(courseCard.enrollment);
export const useCardEntitlementData = useCourseCardData(courseCard.entitlement);
export const useCardGradeData = useCourseCardData(courseCard.gradeData);
export const useCardProviderData = useCourseCardData(courseCard.courseProvider);
export const useCardRelatedProgramsData = useCourseCardData(courseCard.relatedPrograms);

export const useCardSocialSettingsData = (cardId) => {
  const socialShareSettings = module.useSocialShareSettings();
  const { socialShareUrl } = module.useCardCourseData(cardId);
  const defaultSettings = { isEnabled: false, shareUrl: '' };

  if (!socialShareSettings) {
    return { facebook: defaultSettings, twitter: defaultSettings };
  }
  const { facebook, twitter } = socialShareSettings;
  const loadSettings = (target) => ({
    isEnabled: target.isEnabled,
    shareUrl: `${socialShareUrl}?${target.utmParams}`,
  });
  return { facebook: loadSettings(facebook), twitter: loadSettings(twitter) };
};

export const useCardExecEdTrackingParam = (cardId) => {
  const { isExecEd2UCourse } = module.useCardEnrollmentData(cardId);
  const { authOrgId } = module.useEnterpriseDashboardData(cardId);
  return isExecEd2UCourse ? `?org_id=${authOrgId}` : '';
};

/** Events **/
export const useUpdateSelectSessionModalCallback = (cardId) => {
  const dispatch = useDispatch();
  return () => dispatch(actions.updateSelectSessionModal(cardId));
};

export const useTrackCourseEvent = (tracker, cardId, ...args) => {
  const { courseId } = module.useCardCourseRunData(cardId);
  return (e) => tracker(courseId, ...args)(e);
};

export const useSetPageNumber = () => {
  const dispatch = useDispatch();
  return (value) => dispatch(actions.setPageNumber(value));
};

export const useLoadData = () => {
  const dispatch = useDispatch();
  return ({ courses, ...globalData }) => {
    dispatch(actions.setPageNumber(1));
    dispatch(actions.loadGlobalData(globalData));
    dispatch(actions.loadCourses({ courses }));
  };
};
