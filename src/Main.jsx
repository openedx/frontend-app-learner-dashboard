import { CurrentAppProvider, PageWrap } from '@openedx/frontend-base';

import { appId } from './constants';
import ContextProviders from './data/context';
import Dashboard from './containers/Dashboard';

import './style.scss';

const Main = () => (
  <CurrentAppProvider appId={appId}>
    <ContextProviders>
      <PageWrap>
        <Dashboard />
      </PageWrap>
    </ContextProviders>
  </CurrentAppProvider>
);

export default Main;
