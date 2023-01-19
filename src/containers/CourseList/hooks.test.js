import * as paragon from '@edx/paragon';

import { MockUseState } from 'testUtils';
import { reduxHooks } from 'hooks';
import { ListPageSize, SortKeys } from 'data/constants/app';
import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCurrentCourseList: jest.fn(),
    usePageNumber: jest.fn(() => 23),
    useSetPageNumber: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

const testList = ['a', 'b'];
const testListData = {
  numPages: 52,
  visible: testList,
};
const testSortBy = 'fake sort option';
const testFilters = ['some', 'fake', 'filters'];
const testSetFilters = { add: jest.fn(), remove: jest.fn() };
const testCheckboxSetValues = [testFilters, testSetFilters];
const setPageNumber = jest.fn(val => ({ setPageNumber: val }));
reduxHooks.useSetPageNumber.mockReturnValue(setPageNumber);

describe('CourseList hooks', () => {
  let out;

  reduxHooks.useCurrentCourseList.mockReturnValue(testListData);
  paragon.useCheckboxSetValues.mockImplementation(() => testCheckboxSetValues);

  describe('state values', () => {
    state.testGetter(state.keys.sortBy);
    jest.clearAllMocks();
  });

  describe('useCourseListData', () => {
    afterEach(state.restore);
    beforeEach(() => {
      state.mock();
      state.mockVal(state.keys.sortBy, testSortBy);
      out = hooks.useCourseListData();
    });
    describe('behavior', () => {
      it('initializes sort with enrollment date', () => {
        state.expectInitializedWith(state.keys.sortBy, SortKeys.enrolled);
      });
      it('loads current course list with sortBy, filters, and page size', () => {
        expect(reduxHooks.useCurrentCourseList).toHaveBeenCalledWith({
          sortBy: testSortBy,
          filters: testFilters,
          pageSize: ListPageSize,
        });
      });
    });
    describe('output', () => {
      test('pageNumber loads from usePageNumber hook', () => {
        expect(out.pageNumber).toEqual(reduxHooks.usePageNumber());
      });
      test('numPages and visible list load from useCurrentCourseList hook', () => {
        expect(out.numPages).toEqual(testListData.numPages);
        expect(out.visibleList).toEqual(testListData.visible);
      });
      test('showFilters is true iff filters is not empty', () => {
        expect(out.showFilters).toEqual(true);
        state.mockVal(state.keys.sortBy, testSortBy);
        paragon.useCheckboxSetValues.mockReturnValueOnce([[], testSetFilters]);
        out = hooks.useCourseListData();
        // don't show filter when list is empty.
        expect(out.showFilters).toEqual(false);
      });
      describe('filterOptions', () => {
        test('sortBy and setSortBy are connected to the state value', () => {
          expect(out.filterOptions.sortBy).toEqual(testSortBy);
          expect(out.filterOptions.setSortBy).toEqual(state.setState.sortBy);
        });
        test('filters and setFilters passed by useCheckboxSetValues', () => {
          expect(out.filterOptions.filters).toEqual(testFilters);
          expect(out.filterOptions.setFilters).toEqual(testSetFilters);
        });
        test('handleRemoveFilter creates callback to call setFilter.remove', () => {
          const cb = out.filterOptions.handleRemoveFilter(testFilters[0]);
          expect(testSetFilters.remove).not.toHaveBeenCalled();
          cb();
          expect(testSetFilters.remove).toHaveBeenCalledWith(testFilters[0]);
        });
        test('setPageNumber dispatches setPageNumber action with passed value', () => {
          expect(out.setPageNumber(2)).toEqual(setPageNumber(2));
        });
      });
    });
  });
});
