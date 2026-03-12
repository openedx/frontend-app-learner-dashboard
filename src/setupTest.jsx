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

