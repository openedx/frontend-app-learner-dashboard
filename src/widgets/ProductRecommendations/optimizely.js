import { createInstance, setLogLevel } from '@optimizely/react-sdk';

import { getConfig } from '@edx/frontend-platform';

const OPTIMIZELY_SDK_KEY = getConfig().OPTIMIZELY_FULL_STACK_SDK_KEY;

const configureClient = () => {
  setLogLevel('error');

  return createInstance({
    sdkKey: OPTIMIZELY_SDK_KEY,
  });
};

const optimizelyClient = configureClient();

export default optimizelyClient;
