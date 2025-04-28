import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route, Navigate, Routes,
} from 'react-router-dom';

import {
  AppProvider,
  ErrorPage,
  PageWrap,
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
} from '@openedx/frontend-base';
import store from './data/store';

import { configuration } from './config';

import messages from './i18n';

import App from './App';
import NoticesWrapper from './components/NoticesWrapper';

subscribe(APP_READY, () => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <AppProvider store={store}>
        <NoticesWrapper>
          <Routes>
            <Route path="/" element={<PageWrap><App /></PageWrap>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NoticesWrapper>
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

initialize({
  messages,
  requireAuthenticatedUser: true,
});
