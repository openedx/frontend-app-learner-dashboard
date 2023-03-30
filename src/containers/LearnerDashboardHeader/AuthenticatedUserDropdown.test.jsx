import { shallow } from 'enzyme';
import { getConfig } from '@edx/frontend-platform';

import { reduxHooks } from 'hooks';
import { AuthenticatedUserDropdown } from './AuthenticatedUserDropdown';
import { useIsCollapsed } from './hooks';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));
jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: {
      profileImage: 'profileImage',
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
jest.mock('containers/LearnerDashboardHeader/hooks', () => ({
  useIsCollapsed: jest.fn(),
  findCoursesNavDropdownClicked: (href) => jest.fn().mockName(`findCoursesNavDropdownClicked('${href}')`),
}));

const config = {
  ACCOUNT_PROFILE_URL: 'http://account-profile-url.test',
  ACCOUNT_SETTINGS_URL: 'http://account-settings-url.test',
  LOGOUT_URL: 'http://logout-url.test',
  ORDER_HISTORY_URL: 'http://order-history-url.test',
  SUPPORT_URL: 'http://localhost:18000/support',
};
getConfig.mockReturnValue(config);

describe('AuthenticatedUserDropdown', () => {
  const props = {
    username: 'username',
  };
  const defaultDashboardData = {
    label: 'label',
    url: 'url',
  };

  describe('snapshots', () => {
    test('with enterprise dashboard', () => {
      reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(defaultDashboardData);
      useIsCollapsed.mockReturnValueOnce(true);
      const wrapper = shallow(<AuthenticatedUserDropdown {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('without enterprise dashboard and expanded', () => {
      reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
      useIsCollapsed.mockReturnValueOnce(false);
      const wrapper = shallow(<AuthenticatedUserDropdown {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
