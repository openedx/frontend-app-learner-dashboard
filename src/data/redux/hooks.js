import { useSelector } from 'react-redux';

import { actions as appActions } from './app/reducer';
import appSelectors from './app/selectors';

const { courseCard } = appSelectors;

export const useEmailConfirmationData = () => useSelector(appSelectors.emailConfirmation);
export const useEnterpriseDashboardData = () => useSelector(appSelectors.enterpriseDashboards);
export const usePlatformSettingsData = () => useSelector(appSelectors.platformSettings);
// suggested courses is max at 3 at the moment.
export const useSuggestedCoursesData = () => useSelector(appSelectors.suggestedCourses).slice(0, 3);
export const useSelectSessionModalData = () => useSelector(appSelectors.selectSessionModal);

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

export const useCardCertificateData = useCourseCardData(courseCard.certificates);
export const useCardCourseData = useCourseCardData(courseCard.course);
export const useCardCourseRunData = useCourseCardData(courseCard.courseRun);
export const useCardEnrollmentData = useCourseCardData(courseCard.enrollment);
export const useCardEntitlementsData = useCourseCardData(courseCard.entitlements);
export const useCardGradeData = useCourseCardData(courseCard.grades);
export const useCardProviderData = useCourseCardData(courseCard.provider);
export const useCardRelatedProgramsData = useCourseCardData(courseCard.relatedPrograms);

export const useUpdateSelectSessionModalCallback = (dispatch, cardId) => () => dispatch(
  appActions.updateSelectSessionModal(cardId),
);
