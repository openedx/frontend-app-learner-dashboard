import simpleSelectors from './simpleSelectors';
import * as appSelectors from './appSelectors';

describe('basic app selectors', () => {
  describe('numCourses', () => {
    it('returns the number of courses in the courseData object', () => {
      const { preSelectors, cb } = appSelectors.numCourses;
      expect(preSelectors).toEqual([simpleSelectors.courseData]);
      expect(cb({ course1: 'data', course2: 'data', course3: 'data' })).toEqual(3);
    });
  });
  describe('hasCourses', () => {
    it('returns true iff numCourses is greater than 0', () => {
      const { preSelectors, cb } = appSelectors.hasCourses;
      expect(preSelectors).toEqual([appSelectors.numCourses]);
      expect(cb(3)).toEqual(true);
      expect(cb(0)).toEqual(false);
    });
  });
  describe('showSelectSessionModal', () => {
    it('returns true if the selectSessionModal cardId is not null', () => {
      const { preSelectors, cb } = appSelectors.showSelectSessionModal;
      expect(preSelectors).toEqual([simpleSelectors.selectSessionModal]);
      expect(cb({ cardId: 'test' })).toEqual(true);
      expect(cb({ data: 'test' })).toEqual(false);
    });
  });
});
