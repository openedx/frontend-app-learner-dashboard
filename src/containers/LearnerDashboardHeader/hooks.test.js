import track from 'tracking';
import { linkNames } from 'tracking/constants';

import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

const state = new MockUseState(hooks);

const {
  findCoursesNavClicked,
  useLearnerDashboardHeaderMenu,
} = hooks;

jest.mock('tracking', () => ({
  findCourses: {
    findCoursesClicked: jest.fn(),
  },
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage,
    }),
  };
});

const url = 'http://example.com';

describe('LearnerDashboardHeader hooks', () => {
  describe('state values', () => {
    state.testGetter(state.keys.isOpen);
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
    test('calls header menu data hook', () => {
      const courseSearchUrl = '/courses';
      const authenticatedUser = {
        username: 'test',
      };
      const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({ courseSearchUrl, authenticatedUser });
      expect(learnerHomeHeaderMenu.mainMenu.length).toBe(2);
    });
  });
});
