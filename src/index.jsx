/* eslint-disable import/prefer-default-export */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Navigate, Route, Routes,
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
  getConfig,
  mergeConfig,
} from '@edx/frontend-platform';
import { FooterSlot } from '@edx/frontend-component-footer';

import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProviders from 'data/context';
import { ProgramsList } from './containers/ProgramDashboard';
import { configuration } from './config';

import messages from './i18n';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000,
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
            <LearnerDashboardHeader />
            <Routes>
              <Route path="/" element={<PageWrap><App /></PageWrap>} />
              {getConfig().ENABLE_PROGRAM_DASHBOARD && (
                <Route path="programs" element={<PageWrap><ProgramsList /></PageWrap>} />
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <FooterSlot />
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
