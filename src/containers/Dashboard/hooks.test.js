import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@edx/paragon';

import { apiHooks } from 'hooks';

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

const initializeApp = jest.fn();
apiHooks.useInitializeApp.mockReturnValue(initializeApp);
describe('CourseCard hooks', () => {
  const { formatMessage } = useIntl();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useIsDashboardCollapsed', () => {
    it('returns true iff windowSize width is below the xl breakpoint', () => {
      useWindowSize.mockReturnValueOnce({ width: 20 });
      breakpoints.large = { maxWidth: 30 };
      expect(hooks.useIsDashboardCollapsed()).toEqual(true);
      useWindowSize.mockReturnValueOnce({ width: 40 });
      expect(hooks.useIsDashboardCollapsed()).toEqual(false);
      useWindowSize.mockReturnValueOnce({ width: 40 });
      expect(hooks.useIsDashboardCollapsed()).toEqual(false);
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
