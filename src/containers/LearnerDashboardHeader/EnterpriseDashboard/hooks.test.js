import { MockUseState } from 'testUtils';
import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useEnterpriseDashboardData: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

const enterpriseDashboardData = {
  availableDashboards: [
    { label: 'Personal', url: '/dashboard' },
    { label: 'edX, Inc.', url: '/edx-dashboard' },
    { label: 'Harvard', url: '/harvard-dashboard' },
  ],
  mostRecentDashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
};

describe('EnterpriseDashboard hooks', () => {
  appHooks.useEnterpriseDashboardData.mockReturnValue({ ...enterpriseDashboardData });

  describe('state values', () => {
    state.testGetter(state.keys.showDialog);
    state.testGetter(state.keys.selectedItem);
  });

  describe('behavior', () => {
    let out;

    beforeEach(() => {
      state.mock();
      out = hooks.useEnterpriseDashboardHook();
    });
    afterEach(state.restore);

    test('useEnterpriseDashboardHook to return dashboard data from redux hooks', () => {
      expect(out.availableDashboards).toMatchObject(enterpriseDashboardData.availableDashboards);
      expect(out.mostRecentDashboard).toMatchObject(enterpriseDashboardData.mostRecentDashboard);
    });

    test('modal is open on begin select dashboard item', () => {
      state.expectInitializedWith('showDialog', false);
      state.expectInitializedWith('selectedItem', {});
      const selectedItem = { abitary: 'not so true' };
      out.beginSelectDashboardItem(selectedItem)();
      expect(state.values.showDialog).toEqual(true);
      expect(state.values.selectedItem).toMatchObject(selectedItem);
    });

    test('modal is close on cancel select dashboard item', () => {
      out.cancelSelectDashboardItem();
      expect(state.values.selectedItem).toMatchObject({});
      expect(state.values.showDialog).toEqual(false);
    });
  });
});
