import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { ErrorPage } from '@edx/frontend-platform/react';
import { Alert } from '@openedx/paragon';

import Dashboard from 'containers/Dashboard';

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
