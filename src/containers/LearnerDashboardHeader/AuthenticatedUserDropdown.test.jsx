import { shallow } from 'enzyme';

import { hooks as appHooks } from 'data/redux';
import { AuthenticatedUserDropdown } from './AuthenticatedUserDropdown';
import { useIsCollapsed } from './hooks';

jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: {
      profileImage: 'profileImage',
    },
  },
}));
jest.mock('data/redux', () => ({
  hooks: {
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
      appHooks.useEnterpriseDashboardData.mockReturnValueOnce(defaultDashboardData);
      useIsCollapsed.mockReturnValueOnce(true);
      const wrapper = shallow(<AuthenticatedUserDropdown {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('without enterprise dashboard and expanded', () => {
      appHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
      useIsCollapsed.mockReturnValueOnce(false);
      const wrapper = shallow(<AuthenticatedUserDropdown {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
