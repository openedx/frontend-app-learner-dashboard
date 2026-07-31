import { useMemo } from 'react';

import { useInitializeLearnerHome, useCourseCompletion } from 'data/hooks';
import { getTransformedCourseDataList } from 'utils/dataTransformers';
import { getSecondsSpentByCourseId, getTotalTimeSpent } from 'utils/timeTracking';

export const useProgressSummaryData = () => {
  const { data } = useInitializeLearnerHome();
  const { data: completionData } = useCourseCompletion();

  return useMemo(() => {
    const courses = getTransformedCourseDataList(data?.courses || []);
    const total = courses.length;
    const completed = courses.filter(({ courseRun }) => courseRun?.isArchived).length;
    const inProgress = courses.filter(
      ({ courseRun, enrollment }) => enrollment?.hasStarted && !courseRun?.isArchived,
    ).length;
    const overallProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
    const secondsSpentByCourseId = getSecondsSpentByCourseId(completionData);
    const totalTimeSpent = getTotalTimeSpent(courses, secondsSpentByCourseId);

    return {
      total,
      completed,
      inProgress,
      overallProgress,
      totalTimeSpent,
    };
  }, [data, completionData]);
};

export default useProgressSummaryData;
