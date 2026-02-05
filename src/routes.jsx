const routes = [
  {
    id: 'org.openedx.frontend.route.learnerDashboard.main',
    path: '/',
    handle: {
      role: 'org.openedx.frontend.role.dashboard'
    },
    async lazy () {
      const module = await import('./Main');
      return { Component: module.default };
    },
  }
];

export default routes;
