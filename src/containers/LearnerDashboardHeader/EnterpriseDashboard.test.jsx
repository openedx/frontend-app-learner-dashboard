import { MockUseState } from 'testUtils';
import { hooks as appHooks } from 'data/redux';

import * as Component from './EnterpriseDashboard';
import { shallow } from 'enzyme';

const {
  EnterpriseDashboard,
  useEnterpriseDashboardHook,
} = Component;

jest.mock('data/redux', () => ({
  hooks: {
    useEnterpriseDashboardData: jest.fn(),
  },
}));

const state = new MockUseState(Component);

const useEnterpriseDashboardData = {
  availableDashboards: [
    { label: 'Personal', url: '/dashboard' },
    { label: 'edX, Inc.', url: '/edx-dashboard' },
    { label: 'Harvard', url: '/harvard-dashboard' },
  ],
  mostRecentDashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
}

describe('EnterpriseDashboard', () => {
  describe('state values', () => {
    state.testGetter(state.keys.showDialog);
    state.testGetter(state.keys.selectedItem);
  });

  describe('hooks', () => {
    let out;
    
    beforeEach(() => {
      state.mock();
      appHooks.useEnterpriseDashboardData.mockReturnValueOnce({...useEnterpriseDashboardData});
      out = useEnterpriseDashboardHook();
    });
    afterEach(state.restore);

    test('useEnterpriseDashboardHook to return dashboard data from redux hooks', () => {
      expect(out.availableDashboards).toMatchObject(useEnterpriseDashboardData.availableDashboards);
      expect(out.mostRecentDashboard).toMatchObject(useEnterpriseDashboardData.mostRecentDashboard);
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
  
  
  describe('component', () => {
    describe('snapshot', () => {
      appHooks.useEnterpriseDashboardData.mockReturnValueOnce({...useEnterpriseDashboardData});
      let el = shallow(EnterpriseDashboard);
      expect(el).toMatchSnapshot();
    });
  })
});
