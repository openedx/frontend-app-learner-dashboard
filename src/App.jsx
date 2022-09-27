import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Footer from '@edx/frontend-component-footer';

import { actions } from 'data/redux';
import fakeData from 'data/services/lms/fakeData/courses';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import Dashboard from 'containers/Dashboard';

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  // TODO: made development-only
  React.useEffect(() => {
    window.loadMockData = () => {
      dispatch(actions.app.loadGlobalData(fakeData.globalData));
      dispatch(actions.app.loadCourses({
        courses: [
          ...fakeData.courseRunData,
          ...fakeData.entitlementData,
        ],
      }));
    };
  });
  return (
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
};

export default App;
