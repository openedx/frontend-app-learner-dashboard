import { MockUseState } from 'testUtils';

import { hooks as appHooks } from 'data/redux';
import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCurrentCourseList: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

describe('CourseList hooks', () => {
  let out;
  describe('state values', () => {
    state.testGetter(state.keys.pageNumber);
    state.testGetter(state.keys.sortBy);
  });

  describe('useCourseListData', () => {
    beforeEach(() => state.mock());
    afterEach(state.restore);

    test('empty initializes', () => {
      appHooks.useCurrentCourseList.mockReturnValueOnce({
        numPages: 1,
        visible: [],
      });
      out = hooks.useCourseListData();
      expect(out.numPages).toEqual(1);
      expect(out.visibleList).toEqual([]);
    });

    test('page count and visble list', () => {
      const result = {
        numPages: 2,
        visible: ['a', 'b'],
      };
      appHooks.useCurrentCourseList.mockReturnValueOnce(result);
      out = hooks.useCourseListData();
      expect(out.numPages).toEqual(result.numPages);
      expect(out.visibleList).toEqual(result.visible);
    });
    test('handle remove filter', () => {
      appHooks.useCurrentCourseList.mockReturnValueOnce({
        numPages: 1,
        visible: [],
      });
      out = hooks.useCourseListData();
      out.filterOptions.handleRemoveFilter('a')();
      expect(out.filterOptions.setFilters.remove).toHaveBeenCalledWith('a');
    });
  });
});
