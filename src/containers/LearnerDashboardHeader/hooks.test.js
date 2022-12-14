import { useWindowSize, breakpoints } from '@edx/paragon';
import track from 'tracking';
import { linkNames } from 'tracking/constants';
import { useIsCollapsed, findCoursesNavClicked, findCoursesNavDropdownClicked } from './hooks';

jest.mock('tracking', () => ({
  findCourses: {
    findCoursesClicked: jest.fn(),
  },
}));

const url = 'http://example.com';

describe('LearnerDashboardHeader hooks', () => {
  describe('useIsCollapsed', () => {
    test('large screen is not collapsed', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.maxWidth + 1 });
      expect(useIsCollapsed()).toEqual(false);
    });
    test('small screen is collapsed', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.maxWidth - 1 });
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
});
