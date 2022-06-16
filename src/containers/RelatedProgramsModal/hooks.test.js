import { testCardValues } from 'testUtils';
import * as appHooks from 'hooks';
import { selectors } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux/cardData/selectors', () => ({
  ...jest.requireActual('data/redux/cardData/selectors'),
  programs: {
    estimatedNumberOfWeeks: (p) => p.estimatedNumberOfWeeks,
    numberOfCourses: (p) => p.numberOfCourses,
    programType: (p) => p.programType,
    programTypeUrl: (p) => p.programTypeUrl,
    provider: (p) => p.provider,
    title: (p) => p.title,
  },
}));

const { fieldKeys } = selectors.cardData;

const courseNumber = 'test-course-number';

const courseTitle = 'test-course-title';
const relatedPrograms = [
  {
    estimatedNumberOfWeeks: 1,
    numberOfCourses: 2,
    programType: 'test-program-type-1',
    programTypeUrl: 'test-program-type-1-url',
    provider: 'test-provider-1',
    title: 'test-program-title-1',
  },
  {
    estimatedNumberOfWeeks: 2,
    numberOfCourses: 3,
    programType: 'test-program-type-2',
    programTypeUrl: 'test-program-type-2-url',
    provider: 'test-provider-2',
    title: 'test-program-title-2',
  },
  {
    estimatedNumberOfWeeks: 3,
    numberOfCourses: 5,
    programType: 'test-program-type-3',
    programTypeUrl: 'test-program-type-3-url',
    provider: 'test-provider-3',
    title: 'test-program-title-3',
  },
];

describe('RelatedProgramsModal hooks', () => {
  let out;
  beforeEach(() => {
    appHooks.useCardValues.mockReturnValueOnce({ courseTitle, relatedPrograms });
    out = hooks.useProgramData({ courseNumber });
  });
  testCardValues(courseNumber, {
    courseTitle: fieldKeys.courseTitle,
    relatedPrograms: fieldKeys.relatedPrograms,
  });
  test('courseTitle loads course title', () => {
    expect(out.courseTitle).toEqual(courseTitle);
  });
  test('relatedPrograms loads from course run related programs', () => {
    expect(out.relatedPrograms).toEqual(relatedPrograms);
  });
});
