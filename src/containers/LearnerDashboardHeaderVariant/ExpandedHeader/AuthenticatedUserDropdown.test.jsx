import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { AppContext } from '@edx/frontend-platform/react';
import { AuthenticatedUserDropdown } from './AuthenticatedUserDropdown';
import { useIsCollapsed } from '../hooks';

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
