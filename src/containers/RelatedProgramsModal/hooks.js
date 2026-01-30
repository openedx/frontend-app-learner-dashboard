import { useCourseData } from 'hooks';

// TODO: not being used
export const useProgramData = ({
  cardId,
}) => {
  const courseData = useCourseData(cardId);
  return {
    courseTitle: courseData?.course?.title || courseData?.course?.courseName || '',
    relatedPrograms: courseData?.programs?.relatedPrograms || [],
  };
};

export default useProgramData;
