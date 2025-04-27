import { AppProvider } from '@openedx/frontend-base';

import GlobalDataProvider from './data/contexts/GlobalDataProvider';
import MasqueradeUserProvider from './data/contexts/MasqueradeUserProvider';

const providers: AppProvider[] = [
  GlobalDataProvider,
  MasqueradeUserProvider,
];

export default providers;
