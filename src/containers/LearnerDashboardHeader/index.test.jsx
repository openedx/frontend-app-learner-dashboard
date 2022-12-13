import { shallow } from 'enzyme';
import { AppContext } from '@edx/frontend-platform/react';

import LearnerDashboardHeader, { UserMenu } from '.';

import { useIsCollapsed } from './hooks';

jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: {
      username: 'test-username',
    },
  },
}));
jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
  findCoursesNavClicked: (href) => jest.fn().mockName(`findCoursesNavClicked(${href})`),
}));
jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl: 'test-course-search-url',
    })),
  },
}));
jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');

jest.mock('./ConfirmEmailBanner', () => 'ConfirmEmailBanner');
jest.mock('./AuthenticatedUserDropdown', () => 'AuthenticatedUserDropdown');
jest.mock('./GreetingBanner', () => 'GreetingBanner');

describe('LearnerDashboardHeader', () => {
  describe('snapshots', () => {
    test('with collapsed', () => {
      useIsCollapsed.mockReturnValueOnce(true);
      const wrapper = shallow(<LearnerDashboardHeader />);
      expect(wrapper).toMatchSnapshot();
    });
    test('without collapsed', () => {
      useIsCollapsed.mockReturnValueOnce(false);
      const wrapper = shallow(<LearnerDashboardHeader />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('UserMenu', () => {
    describe('snapshots', () => {
      test('with authenticated user', () => {
        const wrapper = shallow(<UserMenu />);
        expect(wrapper).toMatchSnapshot();
      });
      test('without authenticated user', () => {
        AppContext.authenticatedUser = null;
        const wrapper = shallow(<UserMenu />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
