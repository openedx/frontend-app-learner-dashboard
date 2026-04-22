import { authenticatedLoader, homeRole } from '@openedx/frontend-base';
import { dashboardRole } from './constants';

const routes = [
  {
    id: 'org.openedx.frontend.route.learnerDashboard.main',
    path: '/learner-dashboard',
    loader: authenticatedLoader,
    handle: {
      roles: [dashboardRole, homeRole]
    },
    async lazy () {
      const module = await import(/* webpackChunkName: "learner-dashboard-main" */ './Main');
      return { Component: module.default };
    },
  }
];

export default routes;
