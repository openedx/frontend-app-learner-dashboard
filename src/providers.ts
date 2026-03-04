import { AppProvider } from '@openedx/frontend-base';

import GlobalDataProvider from './data/contexts/GlobalDataProvider';
import { MasqueradeProvider } from './data/context/MasqueradeProvider';

const providers: AppProvider[] = [
  GlobalDataProvider,
  MasqueradeProvider,
];

export default providers;
