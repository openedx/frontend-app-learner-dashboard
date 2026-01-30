/* eslint-disable import/prefer-default-export */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route, Navigate, Routes,
} from 'react-router-dom';

import {
  AppProvider,
  ErrorPage,
  PageWrap,
} from '@edx/frontend-platform/react';
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
} from '@edx/frontend-platform';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProviders from 'data/context';
import { configuration } from './config';

import messages from './i18n';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60_000,
    },
  },
});

subscribe(APP_READY, () => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <AppProvider>
        <ContextProviders>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<PageWrap><App /></PageWrap>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </QueryClientProvider>
        </ContextProviders>
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <ErrorPage message={error.message} />
    </StrictMode>,
  );
});

export const appName = 'LearnerHomeAppConfig';

initialize({
  handlers: {
    config: () => {
      mergeConfig(configuration, appName);
    },
  },
  messages,
  requireAuthenticatedUser: true,
});
