import { keyStore } from 'utils';
import { FilterKeys, SortKeys } from 'data/constants/app';
import simpleSelectors from './simpleSelectors';
import * as module from './currentList';

jest.mock('./simpleSelectors', () => ({
  __esModule: true,
  default: {
    courseData: jest.fn(),
    pageNumber: jest.fn(),
  },
}));

const {
  sortFn,
  courseFilters,
  transforms,
  courseFilterFn,
  currentList,
  visibleList,
} = module;

const moduleKeys = keyStore(module);

const testDate = '2000-10-10';
const testString = 'test-STRING';

describe('courseList selector module', () => {
  describe('utilities', () => {
    describe('sortFn', () => {
      it('performs comparison sort after running both values through transform', () => {
        const transform = ({ val }) => val;
        expect(sortFn(transform, { reverse: false })({ val: 2 }, { val: 1 })).toEqual(1);
        expect(sortFn(transform, { reverse: false })({ val: 1 }, { val: 1 })).toEqual(0);
        expect(sortFn(transform, { reverse: false })({ val: 1 }, { val: 2 })).toEqual(-1);
        expect(sortFn(transform, { reverse: true })({ val: 2 }, { val: 1 })).toEqual(-1);
        expect(sortFn(transform, { reverse: true })({ val: 1 }, { val: 1 })).toEqual(0);
        expect(sortFn(transform, { reverse: true })({ val: 1 }, { val: 2 })).toEqual(1);
      });
    });
    describe('courseFilters', () => {
      let filterFn;
      test('notEnrolled returns true iff course is not enrolled', () => {
        filterFn = courseFilters[FilterKeys.notEnrolled];
        expect(filterFn({ enrollment: { isEnrolled: true } })).toEqual(false);
        expect(filterFn({ enrollment: { isEnrolled: false } })).toEqual(true);
      });
      test('done returns true iff learner has finished course', () => {
        filterFn = courseFilters[FilterKeys.done];
        expect(filterFn({ courseRun: null })).toEqual(false);
        expect(filterFn({ courseRun: { isArchived: true } })).toEqual(true);
        expect(filterFn({ courseRun: { isArchived: false } })).toEqual(false);
      });
      test('upgraded returns true if learner is verified', () => {
        filterFn = courseFilters[FilterKeys.upgraded];
        expect(filterFn({ enrollment: { isVerified: true } })).toEqual(true);
        expect(filterFn({ enrollment: { isVerified: false } })).toEqual(false);
      });
      test('inProgress returns true iff learner has started course', () => {
        filterFn = courseFilters[FilterKeys.inProgress];
        expect(filterFn({ enrollment: { hasStarted: true } })).toEqual(true);
        expect(filterFn({ enrollment: { hasStarted: false } })).toEqual(false);
      });
      test('notStarted returns true iff learner has not started course', () => {
        filterFn = courseFilters[FilterKeys.notStarted];
        expect(filterFn({ enrollment: { hasStarted: true } })).toEqual(false);
        expect(filterFn({ enrollment: { hasStarted: false } })).toEqual(true);
      });
    });
    describe('transforms', () => {
      test('enrolled transform returns date transform of enrollment.lastEnrolled', () => {
        const data = { enrollment: { lastEnrolled: testDate } };
        expect(transforms[SortKeys.enrolled](data)).toEqual(new Date(testDate));
      });
      test('title transform returns lowercase transform of course.courseName', () => {
        const data = { course: { courseName: testString } };
        expect(transforms[SortKeys.title](data)).toEqual(testString.toLowerCase());
      });
    });
    describe('courseFilterFn', () => {
      it('returns always-true filter if filter list is empty', () => {
        expect(courseFilterFn([])()).toEqual(true);
      });
      it('takes filters and then course, and returns true if course matches all filters', () => {
        const filters = [FilterKeys.inProgress, FilterKeys.upgraded];
        const inProgressSpy = jest.spyOn(courseFilters, FilterKeys.inProgress);
        const upgradedSpy = jest.spyOn(courseFilters, FilterKeys.upgraded);
        inProgressSpy.mockImplementation(v => v > 3);
        upgradedSpy.mockImplementation(v => v > 5);

        expect(courseFilterFn(filters)(6)).toEqual(true);
        expect(courseFilterFn(filters)(5)).toEqual(false);
        upgradedSpy.mockImplementation(v => v > 2);
        expect(courseFilterFn(filters)(3)).toEqual(false);

        inProgressSpy.mockRestore();
        upgradedSpy.mockRestore();
      });
    });
    describe('currentList selector', () => {
      it('returns passed courses filtered and sorted', () => {
        const sortSpy = jest.spyOn(module, moduleKeys.sortFn);
        const filterSpy = jest.spyOn(module, moduleKeys.courseFilterFn);
        filterSpy.mockReturnValue(({ val }) => val > 0);
        sortSpy.mockReturnValue((v1, v2) => {
          const [a, b] = [v1, v2].map(({ val }) => val);
          if (a === b) { return 0; }
          return (a > b) ? 1 : -1;
        });
        const testCourses = {
          empty: { val: 0 },
          v1: { val: 1 },
          v2: { val: 2 },
          v3: { val: 3 },
        };
        const {
          empty,
          v1,
          v2,
          v3,
        } = testCourses;
        let sortBy = SortKeys.enrolled;
        const testFilters = [1, 2, 3];
        expect(currentList(
          [empty, v2, v1, empty, empty, v3, empty],
          { sortBy, filters: testFilters },
        )).toEqual([v1, v2, v3]);
        expect(sortSpy).toHaveBeenCalledWith(transforms[sortBy], { reverse: true });
        expect(filterSpy).toHaveBeenCalledWith(testFilters);

        sortSpy.mockClear();
        sortBy = SortKeys.title;
        expect(currentList(
          [empty, v2, v1, empty, empty, v3, empty],
          { sortBy, filters: testFilters },
        )).toEqual([v1, v2, v3]);
        expect(sortSpy).toHaveBeenCalledWith(transforms[sortBy], { reverse: false });
        expect(filterSpy).toHaveBeenCalledWith(testFilters);
        sortSpy.mockRestore();
        filterSpy.mockRestore();
      });
    });
  });
  describe('visibleList selector', () => {
    let listSpy;
    let out;
    const pageSize = 2;
    const pageNumber = 3;
    const testState = { some: 'state' };
    const sortBy = SortKeys.enrolled;
    const testFilters = [1, 2, 3];
    const testCourseData = { test: 'course-data' };
    const testList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    beforeEach(() => {
      listSpy = jest.spyOn(module, moduleKeys.currentList);
      listSpy.mockReturnValue(testList);
      simpleSelectors.courseData.mockReturnValue(testCourseData);
      simpleSelectors.pageNumber.mockReturnValue(pageNumber);
      out = visibleList(testState, { sortBy, filters: testFilters, pageSize });
    });
    afterEach(() => {
      listSpy.mockRestore();
    });
    it('loads currentList from courseData values and passed sortBy and filters values', () => {
      expect(simpleSelectors.courseData).toHaveBeenCalledWith(testState);
      expect(simpleSelectors.pageNumber).toHaveBeenCalledWith(testState);
      expect(listSpy).toHaveBeenCalledWith(
        Object.values(testCourseData),
        { sortBy, filters: testFilters },
      );
    });
    it('returns visible page based on passed page size and stored pageNumber', () => {
      // page 3, 2 per page. [0 1] [2 3] [4 5] ...
      expect(out.visibleList).toEqual([testList[4], testList[5]]);
    });
    it('returns number of pages based on page size and list length', () => {
      expect(out.numPages).toEqual(6);
    });
    it('disable pagination if page size is 0', () => {
      out = visibleList(testState, { sortBy, filters: testFilters, pageSize: 0 });
      expect(out.visible).toEqual(testList);
      expect(out.numPages).toEqual(1);
    });
  });
});
