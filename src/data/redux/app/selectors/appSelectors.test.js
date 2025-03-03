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
  describe('hasAvailableDashboards', () => {
    it('returns true iff the enterpriseDashboard field is populated and learner portal is enabled', () => {
      const { preSelectors, cb } = appSelectors.hasAvailableDashboards;
      expect(preSelectors).toEqual([simpleSelectors.enterpriseDashboard]);
      expect(cb({ isLearnerPortalEnabled: true })).toEqual(true);
      expect(cb({ isLearnerPortalEnabled: false })).toEqual(false);
      expect(cb(null)).toEqual(false);
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
