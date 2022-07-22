import { useSelector } from 'react-redux';

import appSelectors from './app/selectors';

const { courseCard } = appSelectors;

export const useEmailConfirmationData = () => useSelector(appSelectors.emailConfirmation);
export const useEnterpriseDashboardData = () => useSelector(appSelectors.enterpriseDashboards);
export const usePlatformSettingsData = () => useSelector(appSelectors.platformSettings);

// eslint-disable-next-line
export const useCourseCardData = (selector) => (courseNumber) => useSelector(
  (state) => selector(state, courseNumber),
);

export const useCardCertificateData = useCourseCardData(courseCard.certificates);
export const useCardCourseData = useCourseCardData(courseCard.course);
export const useCardCourseRunData = useCourseCardData(courseCard.courseRun);
export const useCardEnrollmentData = useCourseCardData(courseCard.enrollment);
export const useCardEntitlementsData = useCourseCardData(courseCard.entitlements);
export const useCardGradeData = useCourseCardData(courseCard.grades);
export const useCardProviderData = useCourseCardData(courseCard.provider);
export const useCardRelatedProgramsData = useCourseCardData(courseCard.relatedPrograms);
