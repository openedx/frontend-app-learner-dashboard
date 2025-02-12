import { MockUseState } from 'testUtils';
import { reduxHooks } from 'hooks';
import track from 'tracking';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useEnterpriseDashboardData: jest.fn(),
  },
}));
jest.mock('tracking', () => {
  const modalOpenedEvent = jest.fn();
  const modalClosedEvent = jest.fn();
  const modalCTAClickedEvent = jest.fn();
  return {
    __esModule: true,
    default: {
      enterpriseDashboard: {
        modalOpenedEvent,
        modalClosedEvent,
        modalCTAClickedEvent,
        modalOpened: jest.fn(() => modalOpenedEvent),
        modalClosed: jest.fn(() => modalClosedEvent),
        modalCTAClicked: jest.fn(() => modalCTAClickedEvent),
      },
    },
  };
});

const state = new MockUseState(hooks);

const enterpriseDashboardData = { label: 'edX, Inc.', url: '/edx-dashboard' };

describe('EnterpriseDashboard hooks', () => {
  reduxHooks.useEnterpriseDashboardData.mockReturnValue({ ...enterpriseDashboardData });

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
