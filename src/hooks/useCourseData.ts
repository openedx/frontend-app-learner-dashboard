import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import { useMemo } from 'react';
import { getTransformedCourseDataList } from 'utils/dataTransformers';

const useCourseData = (cardId: string) => {
  const { data } = useInitializeLearnerHome();
  const courseData = useMemo(() => {
    const courseList = getTransformedCourseDataList(data?.courses || []);
    return courseList.find((c: any) => c.cardId === cardId);
  }, [cardId, data?.courses]);
  return courseData;
};

export default useCourseData;
