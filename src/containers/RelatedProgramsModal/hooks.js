import { reduxHooks } from 'hooks';

export const useProgramData = ({
  cardId,
}) => ({
  courseTitle: reduxHooks.useCardCourseData(cardId).title,
  relatedPrograms: reduxHooks.useCardRelatedProgramsData(cardId).list,
});

export default useProgramData;
