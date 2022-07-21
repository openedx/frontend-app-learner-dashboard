import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
    useCardRelatedProgramsData: jest.fn(),
  },
}));

const courseNumber = 'test-course-number';

const courseTitle = 'test-course-title';
const relatedPrograms = ['some', 'programs'];

describe('RelatedProgramsModal hooks', () => {
  it('forwards course title and related programs list by course number', () => {
    appHooks.useCardCourseData.mockReturnValue({ title: courseTitle });
    appHooks.useCardRelatedProgramsData.mockReturnValue({ list: relatedPrograms });
    const out = hooks.useProgramData({ courseNumber });
    expect(appHooks.useCardCourseData).toHaveBeenCalledWith(courseNumber);
    expect(appHooks.useCardRelatedProgramsData).toHaveBeenCalledWith(courseNumber);
    expect(out).toEqual({ courseTitle, relatedPrograms });
  });
});
