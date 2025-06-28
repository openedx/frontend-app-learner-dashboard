import Main from './Main';

const routes = [
  {
    id: 'org.openedx.frontend.route.learnerDashboard.main',
    path: '/',
    handle: {
      role: 'org.openedx.frontend.role.dashboard'
    },
    Component: Main
  }
];

export default routes;
