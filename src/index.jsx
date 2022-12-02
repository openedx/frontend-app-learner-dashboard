/* eslint-disable import/prefer-default-export */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect } from 'react-router-dom';

import {
  AppProvider,
  ErrorPage,
  PageRoute,
} from '@edx/frontend-platform/react';
import store from 'data/store';
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
} from '@edx/frontend-platform';

import { messages as footerMessages } from '@edx/frontend-component-footer';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { configuration } from './config';

import messages from './i18n';

import App from './App';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <IntlProvider locale="en">
      <AppProvider store={store}>
        <Switch>
          <PageRoute path="/">
            <App />
          </PageRoute>
          <Redirect to="/" />
        </Switch>
      </AppProvider>
    </IntlProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <IntlProvider locale="en">
      <ErrorPage message={error.message} />
    </IntlProvider>,
    document.getElementById('root'),
  );
});

export const appName = 'LearnerHomeAppConfig';

initialize({
  handlers: {
    config: () => {
      mergeConfig(configuration, appName);
    },
  },
  messages: [
    messages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
});
