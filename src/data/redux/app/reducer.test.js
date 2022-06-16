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
      test('loadEntitlements loads entitlements from payload', () => {
        testAction(
          actions.loadEntitlements(testValue),
          { entitlements: testValue },
        );
      });
      describe('loadEnrollments', () => {
        const enrollments = [
          'course-1',
          'course-2',
          'course-3',
        ];
        const courseData = {
          [enrollments[0]]: {
            courseRun: { courseNumber: enrollments[0] },
            course: 1,
            some: 'data',
          },
          [enrollments[1]]: {
            courseRun: { courseNumber: enrollments[1] },
            course: 2,
            some: 'other data',
          },
          [enrollments[2]]: {
            courseRun: { courseNumber: enrollments[2] },
            course: 3,
            some: 'still different data',
          },
        };
        const enrollmentData = enrollments.map(v => courseData[v]);
        let out;
        beforeEach(() => {
          out = reducer(testState, actions.loadEnrollments(enrollmentData));
        });
        it('loads list of courseRun ids into enrollments field', () => {
          expect(out.enrollments).toEqual(enrollments);
        });
        it('loads object keyed by courseRun ids into courseData field', () => {
          expect(out.courseData).toEqual(courseData);
        });
      });
    });
  });
});
