import { hooks as appHooks } from 'data/redux';

export const useProgramData = ({
  courseNumber,
}) => ({
  courseTitle: appHooks.useCardCourseData(courseNumber).title,
  relatedPrograms: appHooks.useCardRelatedProgramsData(courseNumber).list,
});

export default useProgramData;
