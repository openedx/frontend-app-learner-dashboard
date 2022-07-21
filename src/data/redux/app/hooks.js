import { useSelector } from 'react-redux';

import selectors from './selectors';

const { courseCard } = selectors;

export const useEmailConfirmationData = () => useSelector(selectors.emailConfirmation);
export const useEnterpriseDashboardData = () => useSelector(selectors.enterpriseDashboards);
export const usePlatformSettingsData = () => useSelector(selectors.platformSettings);

// eslint-disable-next-line
export const useCourseCardData = (selector) => (courseNumber) => useSelector(
  (state) => selector(selectors.courseData(state)[courseNumber]),
);

export const useCardCertificateData = useCourseCardData(courseCard.certificates);
export const useCardCourseData = useCourseCardData(courseCard.course);
export const useCardCourseRunData = useCourseCardData(courseCard.courseRun);
export const useCardEnrollmentData = useCourseCardData(courseCard.enrollment);
export const useCardEntitlementsData = useCourseCardData(courseCard.entitlements);
export const useCardGradesData = useCourseCardData(courseCard.grades);
export const useCardProviderData = useCourseCardData(courseCard.provider);
export const useCardRelatedProgramsData = useCourseCardData(courseCard.relatedPrograms);
