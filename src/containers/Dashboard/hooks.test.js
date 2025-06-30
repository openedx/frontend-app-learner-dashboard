import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@openedx/paragon';

import { apiHooks } from 'hooks';
import { MockUseState } from 'testUtils';

import appMessages from 'messages';
import * as hooks from './hooks';

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
  breakpoints: {},
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage,
    }),
  };
});

jest.mock('hooks', () => ({
  apiHooks: {
    useInitializeApp: jest.fn(),
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
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
      it('initializes sidebarShowing to default true value', () => {
        hooks.useDashboardLayoutData();
        state.expectInitializedWith(state.keys.sidebarShowing, true);
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
