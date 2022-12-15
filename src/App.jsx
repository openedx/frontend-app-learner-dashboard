import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import { initializeHotjar } from '@edx/frontend-enterprise-hotjar';

import { ErrorPage, AppContext } from '@edx/frontend-platform/react';
import Footer from '@edx/frontend-component-footer';
import { Alert } from '@edx/paragon';

import { RequestKeys } from 'data/constants/requests';
import store from 'data/store';
import {
  selectors,
  actions,
  thunkActions,
  hooks as appHooks,
} from 'data/redux';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import Dashboard from 'containers/Dashboard';
import ZendeskFab from 'components/ZendeskFab';

import track from 'tracking';

import fakeData from 'data/services/lms/fakeData/courses';

import messages from './messages';

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  // TODO: made development-only
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: appHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: appHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = appHooks.usePlatformSettingsData();
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
      window.store = store;
      window.selectors = selectors;
      window.actions = actions;
      window.thunkActions = thunkActions;
      window.track = track;
    }
    if (process.env.HOTJAR_APP_ID) {
      try {
        initializeHotjar({
          hotjarId: process.env.HOTJAR_APP_ID,
          hotjarVersion: process.env.HOTJAR_VERSION,
          hotjarDebug: !!process.env.HOTJAR_DEBUG,
        });
      } catch (error) {
        logError(error);
      }
    }
  }, [authenticatedUser, dispatch]);
  return (
    <Router>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <div>
        <LearnerDashboardHeader />
        <main>
          {hasNetworkFailure
            ? (
              <Alert variant="danger">
                <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
              </Alert>
            ) : (<Dashboard />)}
        </main>
        <Footer logo={process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG} />
        <ZendeskFab />
      </div>
    </Router>
  );
};

export default App;
