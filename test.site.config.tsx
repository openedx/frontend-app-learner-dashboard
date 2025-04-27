import { EnvironmentTypes, ProjectSiteConfig } from '@openedx/frontend-base';

const config: ProjectSiteConfig = {
  apps: [],

  appId: 'openedxLearnerDashboard',
  baseUrl: 'http://localhost:8080',
  environment: EnvironmentTypes.TEST,
  lmsBaseUrl: 'http://localhost:18000',
  loginUrl: 'http://localhost:18000/login',
  logoutUrl: 'http://localhost:18000/logout',
  siteName: 'localhost',

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
    HOTJAR_APP_ID: 'hot-jar-app-id',
    HOTJAR_VERSION: '6',
    HOTJAR_DEBUG: '',
    ACCOUNT_SETTINGS_URL: 'http://account-settings-url.test',
    ACCOUNT_PROFILE_URL: 'http://account-profile-url.test',
    ENABLE_NOTICES: '',
    CAREER_LINK_URL: '',
    ENABLE_EDX_PERSONAL_DASHBOARD: true,
    ENABLE_PROGRAMS: false,
  }
};

export default config;
