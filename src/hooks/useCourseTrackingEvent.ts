import useCourseData from './useCourseData';

const useCourseTrackingEvent = (tracker: Function, cardId: string, ...args: any[]) => {
  const courseData = useCourseData(cardId);
  const courseId = (courseData as any)?.courseRun?.courseId;

  return (e: Event) => {
    if (courseId) {
      tracker(courseId, ...args)(e);
    }
  };
};

export default useCourseTrackingEvent;
