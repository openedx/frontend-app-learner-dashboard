import { useInitializeLearnerHome } from '@src/data/hooks';

const useCourseData = (cardId: string) => {
  const { data } = useInitializeLearnerHome();
  return data?.coursesByCardId?.[cardId];
};

export default useCourseData;
