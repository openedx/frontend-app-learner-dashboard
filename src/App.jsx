import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import Footer from '@edx/frontend-component-footer';

import { thunkActions } from 'data/redux';
import fakeData from 'data/services/lms/fakeData/courses';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import Dashboard from 'containers/Dashboard';
import messages from './messages';

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  // TODO: made development-only
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  React.useEffect(() => {
    if (authenticatedUser?.administrator || process.env.NODE_ENV === 'development') {
      window.loadEmptyData = () => {
        dispatch(thunkActions.app.loadData({ ...fakeData.globalData, courses: [] }));
      };
      window.loadMockData = () => {
        dispatch(thunkActions.app.loadData({
          ...fakeData.globalData,
          courses: [
            ...fakeData.courseRunData,
            ...fakeData.entitlementData,
          ],
        }));
      };
    }
  });
  return (
    <Router>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
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
