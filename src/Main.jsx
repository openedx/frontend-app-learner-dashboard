import { Provider as ReduxProvider } from 'react-redux';
import { CurrentAppProvider, PageWrap } from '@openedx/frontend-base';

import { appId } from './constants';
import store from './data/store';
import Dashboard from './containers/Dashboard';

import './app.scss';

const Main = () => (
  <CurrentAppProvider appId={appId}>
    <ReduxProvider store={store}>
      <PageWrap>
        <Dashboard />
      </PageWrap>
    </ReduxProvider>
  </CurrentAppProvider>
);

export default Main;
