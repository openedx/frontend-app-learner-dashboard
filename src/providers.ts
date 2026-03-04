import { AppProvider } from '@openedx/frontend-base';

import GlobalDataProvider from './data/contexts/GlobalDataProvider';
import { BackedDataProvider } from './data/context/BackedDataProvider';
import { MasqueradeProvider } from './data/context/MasqueradeProvider';

const providers: AppProvider[] = [
  GlobalDataProvider,
  BackedDataProvider,
  MasqueradeProvider,
];

export default providers;
