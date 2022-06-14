import { selectors } from 'data/redux';
import { getCardValues } from 'hooks';

const { cardData } = selectors;
const { programs } = cardData;

export const modalData = ({
  courseNumber,
}) => {
  const data = getCardValues(courseNumber, {
    courseTitle: cardData.courseTitle,
    relatedPrograms: cardData.relatedPrograms,
  });
  return {
    courseTitle: data.courseTitle,
    relatedPrograms: data.relatedPrograms.map(program => ({
      estimatedNumberOfWeeks: programs.estimatedNumberOfWeeks(program),
      numberOfCourses: programs.numberOfCourses(program),
      programType: programs.programType(program),
      programTypeUrl: programs.programTypeUrl(program),
      provider: programs.provider(program),
      title: programs.title(program),
    })),
  };
};

export default modalData;
