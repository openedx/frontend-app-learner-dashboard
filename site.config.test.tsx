import { EnvironmentTypes, SiteConfig } from '@openedx/frontend-base';

import { appId } from './src/constants';

const siteConfig: SiteConfig = {
  siteId: 'learner-dashboard-test-site',
  siteName: 'Learner Dashboard Test Site',
  baseUrl: 'http://localhost:1996',
  lmsBaseUrl: 'http://localhost:8000',
  loginUrl: 'http://localhost:8000/login',
  logoutUrl: 'http://localhost:8000/logout',

  environment: EnvironmentTypes.TEST,
  basename: '/learner-dashboard',
  apps: [{
    appId,
    config: {
      ECOMMERCE_BASE_URL: 'http://localhost:18130',
      FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
      LEARNING_BASE_URL: 'http://localhost:2000',
    },
  }],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
  segmentKey: '',
};

export default siteConfig;
