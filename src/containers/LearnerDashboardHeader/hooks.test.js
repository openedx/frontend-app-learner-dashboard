import { useWindowSize, breakpoints } from '@openedx/paragon';
import track from 'tracking';
import { linkNames } from 'tracking/constants';

import { MockUseState } from 'testUtils';

import { apiHooks } from 'hooks';
import { mergeConfig } from '@edx/frontend-platform';
import * as hooks from './hooks';

const state = new MockUseState(hooks);

const {
  useIsCollapsed,
  findCoursesNavClicked,
  findCoursesNavDropdownClicked,
  useLearnerDashboardHeaderData,
  useLearnerDashboardHeaderMenu,
} = hooks;

jest.mock('tracking', () => ({
  findCourses: {
    findCoursesClicked: jest.fn(),
  },
}));

jest.mock('hooks', () => ({
  apiHooks: {
    useProgramsConfig: jest.fn(() => ({})),
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

  describe('getLearnerDashboardHeaderMenu', () => {
    const courseSearchUrl = '/courses';
    const authenticatedUser = {
      username: 'test',
    };
    test('calls header menu data hook', () => {
      const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({ courseSearchUrl, authenticatedUser });
      expect(learnerHomeHeaderMenu.mainMenu.length).toBe(2);
      expect(learnerHomeHeaderMenu.secondaryMenu.length).toBe(0);
    });
    test('should add programs and/or support link to menu if the service are configured', () => {
      mergeConfig({ SUPPORT_URL: 'http://localhost:18000/support' });
      apiHooks.useProgramsConfig.mockReturnValue({ enabled: true });
      const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({ courseSearchUrl, authenticatedUser });
      expect(learnerHomeHeaderMenu.mainMenu.length).toBe(3);
      expect(learnerHomeHeaderMenu.secondaryMenu.length).toBe(1);
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
