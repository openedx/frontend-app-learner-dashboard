import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { AuthenticatedUserDropdown } from './AuthenticatedUserDropdown';
import { useIsCollapsed } from '../hooks';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));
jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: {
      profileImage: 'profileImage',
      username: 'username',
    },
  },
}));
jest.mock('hooks', () => ({
  reduxHooks: {
    useEnterpriseDashboardData: jest.fn(),
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl: 'test-course-search-url',
    })),
  },
}));
jest.mock('../hooks', () => ({
  useIsCollapsed: jest.fn(),
  findCoursesNavDropdownClicked: (href) => jest.fn().mockName(`findCoursesNavDropdownClicked('${href}')`),
}));

jest.mock('data/services/lms/urls', () => ({
  programsUrl: 'http://localhost:18000/dashboard/programs',
}));

const config = {
  ACCOUNT_PROFILE_URL: 'http://account-profile-url.test',
  ACCOUNT_SETTINGS_URL: 'http://account-settings-url.test',
  LOGOUT_URL: 'http://logout-url.test',
  ORDER_HISTORY_URL: 'http://order-history-url.test',
  SUPPORT_URL: 'http://localhost:18000/support',
  CAREER_LINK_URL: 'http://localhost:18000/career',
};
getConfig.mockReturnValue(config);

describe('AuthenticatedUserDropdown', () => {
  const defaultDashboardData = {
    label: 'label',
    url: 'url',
  };

  describe('snapshots', () => {
    test('no auth render empty', () => {
      const { authenticatedUser } = AppContext;
      AppContext.authenticatedUser = null;
      const wrapper = shallow(<AuthenticatedUserDropdown />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.isEmptyRender()).toBe(true);
      AppContext.authenticatedUser = authenticatedUser;
    });
    test('with enterprise dashboard', () => {
      reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(defaultDashboardData);
      useIsCollapsed.mockReturnValueOnce(true);
      const wrapper = shallow(<AuthenticatedUserDropdown />);
      expect(wrapper).toMatchSnapshot();
    });
    test('without enterprise dashboard and expanded', () => {
      reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
      useIsCollapsed.mockReturnValueOnce(false);
      const wrapper = shallow(<AuthenticatedUserDropdown />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
