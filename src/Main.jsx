import { CurrentAppProvider, getSiteConfig, PageWrap, useIntl } from '@openedx/frontend-base';
import { Helmet } from 'react-helmet';

import { appId } from './constants';
import ContextProviders from './data/context';
import Dashboard from './containers/Dashboard';
import messages from './messages';

import './style.scss';

const Main = () => {
  const { formatMessage } = useIntl();
  return (
    <CurrentAppProvider appId={appId}>
      <Helmet>
        <title>
          {formatMessage(messages['learner-dash.page.title'], {
            siteName: getSiteConfig().siteName,
          })}
        </title>
      </Helmet>
      <ContextProviders>
        <PageWrap>
          <Dashboard />
        </PageWrap>
      </ContextProviders>
    </CurrentAppProvider>
  );
};

export default Main;
