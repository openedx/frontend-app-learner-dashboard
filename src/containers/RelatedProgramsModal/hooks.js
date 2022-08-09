import { hooks as appHooks } from 'data/redux';

export const useProgramData = ({
  cardId,
}) => ({
  courseTitle: appHooks.useCardCourseData(cardId).title,
  relatedPrograms: appHooks.useCardRelatedProgramsData(cardId).list,
});

export default useProgramData;
