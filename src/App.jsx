import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from '@edx/frontend-component-footer';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import Dashboard from 'containers/Dashboard';

import './App.scss';

export const App = () => (
  <Router>
    <div>
      <LearnerDashboardHeader />
      <main>
        <Dashboard />
      </main>
      <Footer logo={process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG} />
    </div>
  </Router>
);

export default App;
