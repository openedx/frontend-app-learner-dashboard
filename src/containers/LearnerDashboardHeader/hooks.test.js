import { useWindowSize, breakpoints } from '@openedx/paragon';
import track from 'tracking';
import { linkNames } from 'tracking/constants';

import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

const state = new MockUseState(hooks);

const {
  useIsCollapsed,
  findCoursesNavClicked,
  findCoursesNavDropdownClicked,
  useLearnerDashboardHeaderData,
} = hooks;

jest.mock('tracking', () => ({
  findCourses: {
    findCoursesClicked: jest.fn(),
  },
}));

const url = 'http://example.com';

describe('LearnerDashboardHeader hooks', () => {
  describe('state values', () => {
    state.testGetter(state.keys.isOpen);
  });

  describe('useIsCollapsed', () => {
    test('large screen is not collapsed', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.minWidth + 1 });
      expect(useIsCollapsed()).toEqual(false);
    });
    test('small screen is collapsed', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.minWidth - 1 });
      expect(useIsCollapsed()).toEqual(true);
    });
  });

  describe('findCoursesNavClicked', () => {
    test('calls tracking with nav link name', () => {
      findCoursesNavClicked(url);
      expect(track.findCourses.findCoursesClicked).toHaveBeenCalledWith(url, {
        linkName: linkNames.learnerHomeNavExplore,
      });
    });
  });

  describe('findCoursesNavDropdownClicked', () => {
    test('calls tracking with dropdown link name', () => {
      findCoursesNavDropdownClicked(url);
      expect(track.findCourses.findCoursesClicked).toHaveBeenCalledWith(url, {
        linkName: linkNames.learnerHomeNavDropdownExplore,
      });
    });
  });

  describe('useLearnerDashboardHeaderData', () => {
    test('default state', () => {
      state.mock();
      const out = useLearnerDashboardHeaderData();
      state.expectInitializedWith(state.keys.isOpen, false);
      out.toggleIsOpen();
      expect(state.values.isOpen).toEqual(true);
    });
  });
});
