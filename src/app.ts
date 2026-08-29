import { App } from '@openedx/frontend-base';
import { appId } from './constants';
import routes from './routes';
import providers from './providers';
import slots from './slots';

const app: App = {
  appId,
  routes,
  providers,
  slots,
};

export default app;
