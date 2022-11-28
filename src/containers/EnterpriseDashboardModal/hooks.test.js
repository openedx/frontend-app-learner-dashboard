import { MockUseState } from 'testUtils';
import { hooks as appHooks } from 'data/redux';
import track from 'data/services/segment/track';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useEnterpriseDashboardData: jest.fn(),
  },
}));
jest.mock('data/services/segment/track', () => ({
  __esModule: true,
  default: {
    enterpriseDashboard: {
      modalOpened: jest.fn(),
      modalClosed: jest.fn(),
      modalCTAClicked: jest.fn(),
    },
  },
}));

const state = new MockUseState(hooks);

const enterpriseDashboardData = { label: 'edX, Inc.', url: '/edx-dashboard' };

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
      expect(out.dashboard).toMatchObject(enterpriseDashboardData);
    });

    test('modal initializes to shown when rendered and closes on click', () => {
      state.expectInitializedWith(state.keys.showModal, true);
      out.handleClose();
      expect(state.values.showModal).toEqual(false);
    });

    test('modal initializes to shown when rendered and closes on escape', () => {
      state.expectInitializedWith(state.keys.showModal, true);
      out.handleEscape();
      expect(state.values.showModal).toEqual(false);
    });

    test('CTA click tracks modalCTAClicked', () => {
      out.handleCTAClick();
      expect(track.enterpriseDashboard.modalCTAClicked).toHaveBeenCalledWith(
        enterpriseDashboardData.enterpriseUUID,
        enterpriseDashboardData.url,
      );
    });
  });
});
