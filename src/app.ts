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
  config: {
    LEARNING_BASE_URL: 'http://apps.local.openedx.io:2000',
    ENABLE_PROGRAMS: false,
    ECOMMERCE_BASE_URL: '',
    ORDER_HISTORY_URL: '',
    SUPPORT_URL: '',
    SHOW_UNENROLL_SURVEY: false,
  }
};

export default app;
