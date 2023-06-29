import { createInstance } from '@optimizely/react-sdk';
import optimizelyClient from './optimizely';

jest.mock('@optimizely/react-sdk', () => ({
  createInstance: jest.fn(() => 'mockedClient'),
}));

describe('optimizelyClient', () => {
  it('should create an Optimizely client instance with the correct SDK key', () => {
    expect(optimizelyClient).toBeDefined();
    expect(createInstance).toHaveBeenCalledWith({ sdkKey: 'SDK Key' });
  });
});
