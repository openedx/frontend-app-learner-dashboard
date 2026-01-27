import '@testing-library/jest-dom';

import siteConfig from 'site.config';
import { addAppConfigs, configureAnalytics, configureAuth, configureLogging, getSiteConfig, mergeSiteConfig, MockAnalyticsService, MockAuthService, MockLoggingService } from '@openedx/frontend-base';

mergeSiteConfig(siteConfig);
addAppConfigs();

export function initializeMockServices() {
  const loggingService = configureLogging(MockLoggingService, {
    config: getSiteConfig(),
  });

  const authService = configureAuth(MockAuthService, {
    config: getSiteConfig(),
    loggingService,
  });

  const analyticsService = configureAnalytics(MockAnalyticsService, {
    config: getSiteConfig(),
    httpClient: authService.getAuthenticatedHttpClient(),
    loggingService,
  });

  return { analyticsService, authService, loggingService };
}

jest.mock('reselect', () => ({
  createSelector: jest.fn((preSelectors, cb) => ({ preSelectors, cb })),
}));

// Mock react-redux hooks
// unmock for integration tests
jest.mock('react-redux', () => {
  const dispatch = jest.fn((...args) => ({ dispatch: args })).mockName('react-redux.dispatch');
  return {
    connect: (mapStateToProps, mapDispatchToProps) => (component) => ({
      mapStateToProps,
      mapDispatchToProps,
      component,
    }),
    useDispatch: jest.fn(() => dispatch),
    useSelector: jest.fn((selector) => ({ useSelector: selector })),
  };
});

jest.mock('./data/constants/app', () => ({
  ...jest.requireActual('./data/constants/app'),
  locationId: 'fake-location-id',
}));

jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  nullMethod: jest.fn().mockName('utils.nullMethod'),
}));

jest.mock('./utils/hooks', () => {
  const formatDate = jest.fn(date => new Date(date).toLocaleDateString())
    .mockName('utils.formatDate');
  return {
    formatDate,
    useFormatDate: () => formatDate,
  };
});
