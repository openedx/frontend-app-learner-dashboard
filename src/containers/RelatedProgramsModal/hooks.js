import { selectors } from 'data/redux';
import { getCardValue } from 'hooks';

const { cardData } = selectors;
const { programs } = cardData;

export const programsModalData = ({
  courseNumber,
}) => {
  const cardValue = getCardValue(courseNumber);
  return {
    courseTitle: cardValue(cardData.courseTitle),
    relatedPrograms: cardValue(cardData.relatedPrograms).map(program => ({
      estimatedNumberOfWeeks: programs.estimatedNumberOfWeeks(program),
      numberOfCourses: programs.numberOfCourses(program),
      programType: programs.programType(program),
      programTypeUrl: programs.programTypeUrl(program),
      provider: programs.provider(program),
      title: programs.title(program),
    })),
  };
};

export default programsModalData;
