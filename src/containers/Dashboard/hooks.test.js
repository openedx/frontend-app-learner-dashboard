import React from 'react';
import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@edx/paragon';

import { thunkActions } from 'data/redux';

import appMessages from 'messages';
import * as hooks from './hooks';

jest.mock('@edx/paragon', () => ({
  useWindowSize: jest.fn(),
  breakpoints: {},
}));

jest.mock('data/redux', () => ({
  thunkActions: {
    app: {
      initialize: jest.fn(() => 'thunkActions.app.initialize'),
    },
  },
}));

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
      const dispatch = useDispatch();
      hooks.useInitializeDashboard();
      const [cb, prereqs] = React.useEffect.mock.calls[0];
      expect(prereqs).toEqual([dispatch]);
      expect(dispatch).not.toHaveBeenCalled();
      cb();
      expect(dispatch).toHaveBeenCalledWith(thunkActions.app.initialize());
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
