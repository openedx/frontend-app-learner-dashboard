import { shallow } from 'enzyme';
import EnterpriseDashboard from '.';

import useEnterpriseDashboardHook from './hooks';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const enterpriseDashboardData = {
  availableDashboards: [
    { label: 'Personal', url: '/dashboard' },
    { label: 'edX, Inc.', url: '/edx-dashboard' },
    { label: 'Harvard', url: '/harvard-dashboard' },
  ],
  mostRecentDashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
};

describe('EnterpriseDashboard', () => {
  describe('snapshot', () => {
    const hookReturn = {
      ...enterpriseDashboardData,
      showDialog: false,

      selectedItem: {},
      beginSelectDashboardItem: jest.fn().mockName('beginSelectDashboardItem'),
      cancelSelectDashboardItem: jest
        .fn()
        .mockName('cancelSelectDashboardItem'),
    };

    test('initilized', () => {
      useEnterpriseDashboardHook.mockReturnValueOnce({ ...hookReturn });
      const el = shallow(<EnterpriseDashboard />);
      expect(el).toMatchSnapshot();
    });

    test('select item and open modal', () => {
      useEnterpriseDashboardHook.mockReturnValueOnce({
        ...hookReturn,
        selectedItem: enterpriseDashboardData.availableDashboards[0],
        showDialog: true,
      });
      const el = shallow(<EnterpriseDashboard />);
      expect(el).toMatchSnapshot();
    });
  });
});
