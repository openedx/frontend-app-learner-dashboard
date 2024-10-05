import React from 'react';
import { Helmet } from 'react-helmet';

import { initializeHotjar } from '@edx/frontend-enterprise-hotjar';
import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';

import { AppContext, ErrorPage } from '@edx/frontend-platform/react';
import { Alert } from '@openedx/paragon';

import ZendeskFab from 'components/ZendeskFab';
import Dashboard from 'containers/Dashboard';
import { RequestKeys } from 'data/constants/requests';
import { actions, selectors } from 'data/redux';
import store from 'data/store';
import { reduxHooks } from 'hooks';

import track from 'tracking';

import fakeData from 'data/services/lms/fakeData/courses';

import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import AppWrapper from 'containers/WidgetContainers/AppWrapper';

import { getConfig } from '@edx/frontend-platform';
import Footer from 'components/Footer'; // Adjust the path if necessary

import './App.scss';
import messages from './messages';

export const App = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: reduxHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: reduxHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = reduxHooks.usePlatformSettingsData();
  const loadData = reduxHooks.useLoadData();

  React.useEffect(() => {
    if (
      authenticatedUser?.administrator || getConfig().NODE_ENV === 'development'
    ) {
      window.loadEmptyData = () => {
        loadData({ ...fakeData.globalData, courses: [] });
      };
      window.loadMockData = () => {
        loadData({
          ...fakeData.globalData,
          courses: [...fakeData.courseRunData, ...fakeData.entitlementData],
        });
      };
      window.store = store;
      window.selectors = selectors;
      window.actions = actions;
      window.track = track;
    }
    if (getConfig().HOTJAR_APP_ID) {
      try {
        initializeHotjar({
          hotjarId: getConfig().HOTJAR_APP_ID,
          hotjarVersion: getConfig().HOTJAR_VERSION,
          hotjarDebug: !!getConfig().HOTJAR_DEBUG,
        });
      } catch (error) {
        logError(error);
      }
    }
  }, [authenticatedUser, loadData]);
  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
        <link
          rel="shortcut icon"
          href={getConfig().FAVICON_URL}
          type="image/x-icon"
        />
      </Helmet>
      <div>
        <AppWrapper>
          <LearnerDashboardHeader />
          <main>
            {hasNetworkFailure ? (
              <Alert variant="danger">
                <ErrorPage
                  message={formatMessage(messages.errorMessage, {
                    supportEmail,
                  })}
                />
              </Alert>
            ) : (
              <Dashboard />
            )}
          </main>
        </AppWrapper>
        <Footer /> {/* Replace FooterSlot with your new Footer component */}

        <ZendeskFab />
      </div>
    </>
  );
};

export default App;
