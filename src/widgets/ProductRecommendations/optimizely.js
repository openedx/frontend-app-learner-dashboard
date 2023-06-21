import { createInstance } from '@optimizely/react-sdk';

const OPTIMIZELY_SDK_KEY = process.env.OPTIMIZELY_FULL_STACK_SDK_KEY;

const optimizely = createInstance({
  sdkKey: OPTIMIZELY_SDK_KEY,
});

export default optimizely;
