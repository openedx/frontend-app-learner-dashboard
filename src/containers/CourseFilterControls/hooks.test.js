import { useToggle } from '@openedx/paragon';

import { MockUseState } from 'testUtils';
import track from 'tracking';

import * as hooks from './hooks';

jest.mock('tracking', () => ({
  filter: {
    filterClicked: jest.fn(),
    filterOptionSelected: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

describe('CourseFilterControls hooks', () => {
  let out;
  const filters = ['a', 'b', 'c'];
  const setSortBy = jest.fn();
  const setFilters = {
    add: jest.fn(),
    remove: jest.fn(),
  };
  const toggleOpen = jest.fn();
  const toggleClose = jest.fn();
  describe('state values', () => {
    state.testGetter(state.keys.target);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCourseFilterControlsData', () => {
    beforeEach(() => {
      useToggle.mockReturnValueOnce([false, toggleOpen, toggleClose]);
      state.mock();
      out = hooks.useCourseFilterControlsData({
        filters,
        setFilters,
        setSortBy,
      });
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isOpen).toEqual(false);
      expect(out.target).toEqual(state.stateVals.target);
    });

    test('open calls toggleOpen and track.filter.filterClicked', () => {
      out.open();
      expect(toggleOpen).toHaveBeenCalled();
      expect(track.filter.filterClicked).toHaveBeenCalled();
    });

    test('close calls toggleClose and track.filter.filterOptionSelected', () => {
      out.close();
      expect(toggleClose).toHaveBeenCalled();
      expect(track.filter.filterOptionSelected).toHaveBeenCalledWith(filters);
    });

    test('isOpen is true when target is set', () => {
      useToggle.mockReturnValueOnce([true, toggleOpen, toggleClose]);
      expect(out.target).toEqual(null);
      state.mockVal(state.keys.target, 'foo');
      out = hooks.useCourseFilterControlsData({
        filters,
        setFilters,
        setSortBy,
      });
      expect(out.isOpen).toEqual(true);
      expect(out.target).toEqual('foo');
    });

    test('handle filter change', () => {
      const value = 'a';
      out.handleFilterChange({
        target: {
          checked: true,
          value,
        },
      });
      expect(setFilters.add).toHaveBeenCalledWith(value);
      out.handleFilterChange({
        target: {
          checked: false,
          value,
        },
      });
      expect(setFilters.remove).toHaveBeenCalledWith(value);
    });
    test('handle sort change', () => {
      const value = 'a';
      out.handleSortChange({
        target: {
          value,
        },
      });
      expect(setSortBy).toHaveBeenCalledWith(value);
    });
  });
});
