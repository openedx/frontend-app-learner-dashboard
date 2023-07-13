import { createInstance, setLogLevel } from '@optimizely/react-sdk';
import optimizelyClient from './optimizely';

jest.mock('@optimizely/react-sdk', () => ({
  createInstance: jest.fn(() => 'mockedClient'),
  setLogLevel: jest.fn(),
}));

describe('optimizelyClient', () => {
  it('should configure an Optimizely client instance with the correct SDK key', () => {
    expect(optimizelyClient).toBeDefined();
    expect(setLogLevel).toHaveBeenCalledWith('error');
    expect(createInstance).toHaveBeenCalledWith({ sdkKey: 'SDK Key' });
  });
});
