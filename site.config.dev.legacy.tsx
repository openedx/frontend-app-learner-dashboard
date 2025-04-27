import { EnvironmentTypes, ProjectSiteConfig } from '@openedx/frontend-base';

const config: ProjectSiteConfig = {
  apps: [],

  appId: 'openedxLearnerDashboard',
  environment: EnvironmentTypes.DEVELOPMENT,
  baseUrl: 'http://apps.local.openedx.io:8080',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  siteName: 'My Open edX Site',
  mfeConfigApiUrl: 'http://apps.local.openedx.io:8080/api/mfe_config/v1',
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
  segmentKey: '',

  custom: {
    appId: 'openedxLearnerDashboard',
    ACCOUNT_PROFILE_URL: 'http://localhost:1995',
    ACCOUNT_SETTINGS_URL: 'http://localhost:1997',
    CAREER_LINK_URL: '',
    CSRF_TOKEN_API_PATH: '/csrf/api/v1/token',
    ECOMMERCE_BASE_URL: 'http://localhost:18130',
    ENABLE_EDX_PERSONAL_DASHBOARD: false,
    ENABLE_NOTICES: false,
    ENABLE_PROGRAMS: false,
    FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
    HOTJAR_APP_ID: '',
    HOTJAR_DEBUG: '',
    HOTJAR_VERSION: '6',
    LEARNING_BASE_URL: 'http://localhost:2000',
    LOGO_URL: 'https://edx-cdn.org/v3/default/logo.svg',
    SUPPORT_URL: '',
  }
};

export default config;
