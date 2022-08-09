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
  mostRecentDashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
};

describe('EnterpriseDashboard hooks', () => {
  appHooks.useEnterpriseDashboardData.mockReturnValue({ ...enterpriseDashboardData });

  describe('state values', () => {
    state.testGetter(state.keys.showModal);
  });

  describe('behavior', () => {
    let out;

    beforeEach(() => {
      state.mock();
      out = hooks.useEnterpriseDashboardHook();
    });
    afterEach(state.restore);

    test('useEnterpriseDashboardHook to return dashboard data from redux hooks', () => {
      expect(out.mostRecentDashboard).toMatchObject(enterpriseDashboardData.mostRecentDashboard);
    });

    test('modal initializes to shown when rendered and closes on click', () => {
      state.expectInitializedWith(state.keys.showModal, true);
      out.handleClick();
      expect(state.values.showModal).toEqual(false);
    });
  });
});
