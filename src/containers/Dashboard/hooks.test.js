import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@edx/paragon';

import { apiHooks } from 'hooks';
import { MockUseState } from 'testUtils';

import appMessages from 'messages';
import * as hooks from './hooks';

jest.mock('@edx/paragon', () => ({
  useWindowSize: jest.fn(),
  breakpoints: {},
}));

jest.mock('hooks', () => ({
  apiHooks: {
    useInitializeApp: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

const initializeApp = jest.fn();
apiHooks.useInitializeApp.mockReturnValue(initializeApp);
useWindowSize.mockReturnValue({ width: 20 });
breakpoints.large = { maxWidth: 30 };
describe('CourseCard hooks', () => {
  const { formatMessage } = useIntl();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('state fields', () => {
    state.testGetter(state.keys.sidebarShowing);
  });

  describe('useDashboardLayoutData', () => {
    beforeEach(() => { state.mock(); });
    describe('behavior', () => {
      it('initializes sidebarShowing to default false value', () => {
        hooks.useDashboardLayoutData();
        state.expectInitializedWith(state.keys.sidebarShowing, false);
      });
    });
    describe('output', () => {
      describe('isDashboardCollapsed', () => {
        it('returns true iff windowSize width is below the xl breakpoint', () => {
          expect(hooks.useDashboardLayoutData().isDashboardCollapsed).toEqual(true);
          useWindowSize.mockReturnValueOnce({ width: 40 });
          expect(hooks.useDashboardLayoutData().isDashboardCollapsed).toEqual(false);
        });
      });
      it('forwards sidebarShowing and setSidebarShowing from state hook', () => {
        const hook = hooks.useDashboardLayoutData();
        const { sidebarShowing, setSidebarShowing } = hook;
        expect(sidebarShowing).toEqual(state.stateVals.sidebarShowing);
        expect(setSidebarShowing).toEqual(state.setState.sidebarShowing);
      });
    });
  });
  describe('useInitializeDashboard', () => {
    it('dispatches initialize thunk action on component load', () => {
      hooks.useInitializeDashboard();
      const [cb, prereqs] = React.useEffect.mock.calls[0];
      expect(prereqs).toEqual([]);
      expect(initializeApp).not.toHaveBeenCalled();
      cb();
      expect(initializeApp).toHaveBeenCalledWith();
    });
  });
  describe('useDashboardMessages', () => {
    it('returns spinner screen reader text', () => {
      expect(hooks.useDashboardMessages().spinnerScreenReaderText).toEqual(
        formatMessage(appMessages.loadingSR),
      );
    });
    it('returns page title', () => {
      expect(hooks.useDashboardMessages().pageTitle).toEqual(
        formatMessage(appMessages.pageTitle),
      );
    });
  });
});
