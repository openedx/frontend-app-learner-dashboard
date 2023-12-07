import { createInstance, setLogLevel } from '@optimizely/react-sdk';
import optimizelyClient from './optimizely';

jest.mock('@optimizely/react-sdk', () => ({
  createInstance: jest.fn(() => 'mockedClient'),
  setLogLevel: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({ OPTIMIZELY_FULL_STACK_SDK_KEY: 'SDK Key' })),
}));

describe('optimizelyClient', () => {
  it('should configure an Optimizely client instance with the correct SDK key', () => {
    expect(optimizelyClient).toBeDefined();
    expect(setLogLevel).toHaveBeenCalledWith('error');
    expect(createInstance).toHaveBeenCalledWith({ sdkKey: 'SDK Key' });
  });
});
