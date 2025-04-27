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

  custom: {
    appId: 'openedxLearnerDashboard',
    ACCESS_TOKEN_COOKIE_NAME: 'edx-jwt-cookie-header-payload',
    CSRF_TOKEN_API_PATH: '/csrf/api/v1/token',
    ECOMMERCE_BASE_URL: 'http://localhost:18130',
    FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
    LOGO_URL: 'https://edx-cdn.org/v3/default/logo.svg',
    SEGMENT_KEY: '',
    SUPPORT_URL: '',
    LEARNING_BASE_URL: 'http://localhost:2000',
    HOTJAR_APP_ID: '',
    HOTJAR_VERSION: '6',
    HOTJAR_DEBUG: '',
    ACCOUNT_SETTINGS_URL: 'http://localhost:1997',
    ACCOUNT_PROFILE_URL: 'http://localhost:1995',
    ENABLE_NOTICES: '',
    CAREER_LINK_URL: '',
    ENABLE_EDX_PERSONAL_DASHBOARD: false,
    ENABLE_PROGRAMS: false,
  }
};

export default config;
