import { initialState, reducer, actions } from './reducer';

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
    const testValue = 'my-test-value';
    const testAction = (action, expected) => {
      expect(reducer(testState, action)).toEqual({
        ...testState,
        ...expected,
      });
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
            courseRun: { courseNumber: courseIds[0] },
            course: 1,
            some: 'data',
          },
          {
            courseRun: { courseNumber: courseIds[1] },
            course: 2,
            some: 'other data',
          },
          {
            courseRun: { courseNumber: courseIds[2] },
            course: 3,
            some: 'still different data',
          },
        ];
        const entitlementData = [
          {
            courseRun: { courseNumber: entitlementIds[0] },
            course: 4,
            some: 'STILL different data',
          },
          {
            courseRun: { courseNumber: entitlementIds[1] },
            course: 5,
            some: 'still DIFFERENT data',
          },
        ];
        let out;
        beforeEach(() => {
          out = reducer(testState, actions.loadCourses({
            enrollments: enrollmentData,
            entitlements: entitlementData,
          }));
        });
        it('loads list of courseRun ids into enrollments field', () => {
          expect(out.enrollments).toEqual([
            ...courseIds,
            ...entitlementIds,
          ]);
        });
        it('loads object keyed by courseRun ids into courseData field', () => {
          expect(out.courseData).toEqual({
            [courseIds[0]]: enrollmentData[0],
            [courseIds[1]]: enrollmentData[1],
            [courseIds[2]]: enrollmentData[2],
            [entitlementIds[0]]: entitlementData[0],
            [entitlementIds[1]]: entitlementData[1],
          });
        });
      });
    });
  });
});
