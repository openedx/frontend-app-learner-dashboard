import { createInstance, setLogLevel } from '@optimizely/react-sdk';

const OPTIMIZELY_SDK_KEY = process.env.OPTIMIZELY_FULL_STACK_SDK_KEY;

const configureClient = () => {
  setLogLevel('error');

  return createInstance({
    sdkKey: OPTIMIZELY_SDK_KEY,
  });
};

const optimizelyClient = configureClient();

export default optimizelyClient;
