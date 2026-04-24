import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';

import { learnerDashboardApp } from './src';

import '@openedx/frontend-base/shell/style';
import '@openedx/brand-openedx/dist/core.min.css';
import '@openedx/brand-openedx/dist/light.min.css';

const siteConfig: SiteConfig = {
  siteId: 'learner-dashboard-dev',
  siteName: 'Learner Dashboard Dev',
  baseUrl: 'http://localhost:1996',
  lmsBaseUrl: 'http://localhost:18000',
  loginUrl: 'http://localhost:18000/login',
  logoutUrl: 'http://localhost:18000/logout',

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    headerApp,
    footerApp,
    learnerDashboardApp
  ],
  externalRoutes: [
    {
      role: 'org.openedx.frontend.role.profile',
      url: 'http://localhost:1995/profile/'
    },
    {
      role: 'org.openedx.frontend.role.account',
      url: 'http://localhost:1997/account/'
    },
    {
      role: 'org.openedx.frontend.role.logout',
      url: 'http://localhost:18000/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
