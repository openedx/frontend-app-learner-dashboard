import {
  cardId,
  initialState,
  reducer,
  actions,
  today,
} from './reducer';

describe('app reducer', () => {
  describe('reducers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
    const initialFilter = 'initial filter';
    const testState = {
      ...initialState,
      enrollments: [],
      courseData: {
      },
      entitlement: [],
      filters: [initialFilter],
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
            enrollment: { lastEnrolled: 'test-last-enrolled' },
          },
          {
            courseRun: { cardId: courseIds[1] },
            course: 2,
            some: 'other data',
            enrollment: { lastEnrolled: 'test-last-enrolled' },
          },
          {
            courseRun: { cardId: courseIds[2] },
            course: 3,
            some: 'still different data',
            enrollment: { lastEnrolled: 'test-last-enrolled' },
          },
        ];
        const entitlementData = [
          {
            courseRun: { cardId: entitlementIds[0] },
            course: 4,
            some: 'STILL different data',
            enrollment: { lastEnrolled: null },
          },
          {
            courseRun: { cardId: entitlementIds[1] },
            course: 5,
            some: 'still DIFFERENT data',
            enrollment: { lastEnrolled: null },
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
            [cardId(2)]: {
              ...enrollmentData[2],
              cardId: cardId(2),
            },
            [cardId(3)]: {
              ...entitlementData[0],
              cardId: cardId(3),
              enrollment: { lastEnrolled: today },
            },
            [cardId(4)]: {
              ...entitlementData[1],
              cardId: cardId(4),
              enrollment: { lastEnrolled: today },
            },
          });
        });
      });
      describe('filters', () => {
        const newFilter = 'new filter';
        let out;
        beforeEach(() => {
          out = reducer(testState, {});
        });
        it('overwrites the filters object when using setFilters', () => {
          expect(out.filters).toEqual([initialFilter]);
          out = reducer(testState, actions.setFilters([newFilter]));
          expect(out.filters).toEqual([newFilter]);
        });
        it('adds a filter when using addFilter', () => {
          out = reducer(testState, actions.addFilter(newFilter));
          expect(out.filters).toEqual([initialFilter, newFilter]);
        });
        it('removes a filter when using removeFilter', () => {
          out = reducer(testState, actions.removeFilter(initialFilter));
          expect(out.filters).toEqual([]);
        });
        it('clears the filters when using clearFilters', () => {
          out = reducer(testState, actions.clearFilters());
          expect(out.filters).toEqual([]);
        });
      });
    });
  });
});
