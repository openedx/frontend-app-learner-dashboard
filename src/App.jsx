import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import { initializeHotjar } from '@edx/frontend-enterprise-hotjar';

import { ErrorPage, AppContext } from '@edx/frontend-platform/react';
import { FooterSlot } from '@edx/frontend-component-footer';
import { Alert } from '@openedx/paragon';

import Dashboard from 'containers/Dashboard';

import track from 'tracking';

import fakeData from 'data/services/lms/fakeData/courses';
import AppWrapper from 'containers/AppWrapper';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';

import { getConfig } from '@edx/frontend-platform';
import { useInitializeLearnerHome } from 'data/hooks';
import { useMasquerade } from 'data/context';
import messages from './messages';
import './App.scss';

export const App = () => {
  const { formatMessage } = useIntl();
  const { masqueradeUser } = useMasquerade();
  const { data, isError } = useInitializeLearnerHome();
  const hasNetworkFailure = !masqueradeUser && isError;
  const supportEmail = data?.platformSettings?.supportEmail || undefined;

  /* istanbul ignore next */
  React.useEffect(() => {
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
  }, []);
  return (
    <main id="main">
      {hasNetworkFailure
        ? (
          <Alert variant="danger">
            <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
          </Alert>
        ) : (
          <Dashboard />
        )}
    </main>
  );
};

export default App;
