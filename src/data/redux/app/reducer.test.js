import {
  cardId, initialState, reducer, actions,
} from './reducer';

describe('app reducer', () => {
  describe('reducers', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
    const testState = {
      ...initialState,
      enrollments: [],
      courseData: {
      },
      entitlements: [],
    };
    describe('action handlers', () => {
      describe('loadCourses', () => {
        const courseIds = [
          'course-1',
          'course-2',
          'course-3',
        ];
        const entitlementIds = [
          'entitlement-course-1',
          'entitlement-course-2',
        ];
        const enrollmentData = [
          {
            courseRun: { cardId: courseIds[0] },
            course: 1,
            some: 'data',
          },
          {
            courseRun: { cardId: courseIds[1] },
            course: 2,
            some: 'other data',
          },
          {
            courseRun: { cardId: courseIds[2] },
            course: 3,
            some: 'still different data',
          },
        ];
        const entitlementData = [
          {
            courseRun: { cardId: entitlementIds[0] },
            course: 4,
            some: 'STILL different data',
          },
          {
            courseRun: { cardId: entitlementIds[1] },
            course: 5,
            some: 'still DIFFERENT data',
          },
        ];
        let out;
        beforeEach(() => {
          out = reducer(testState, actions.loadCourses({
            courses: [...enrollmentData, ...entitlementData],
          }));
        });
        it('loads object keyed by courseRun ids into courseData field', () => {
          expect(out.courseData).toEqual({
            [cardId(0)]: { ...enrollmentData[0], cardId: cardId(0) },
            [cardId(1)]: { ...enrollmentData[1], cardId: cardId(1) },
            [cardId(2)]: { ...enrollmentData[2], cardId: cardId(2) },
            [cardId(3)]: { ...entitlementData[0], cardId: cardId(3) },
            [cardId(4)]: { ...entitlementData[1], cardId: cardId(4) },
          });
        });
      });
    });
  });
});
