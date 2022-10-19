import { shallow } from 'enzyme';

import { hooks as appHooks } from 'data/redux';
import { isDesktopSize } from 'data/responsive';
import { AuthenticatedUserDropdown } from './AuthenticatedUserDropdown';

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
  },
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
      isDesktopSize.mockReturnValueOnce(false);
      const wrapper = shallow(<AuthenticatedUserDropdown {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('without enterprise dashboard and expanded', () => {
      appHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
      isDesktopSize.mockReturnValueOnce(true);
      const wrapper = shallow(<AuthenticatedUserDropdown {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
