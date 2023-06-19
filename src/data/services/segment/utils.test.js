import { sendTrackEvent } from '@edx/frontend-platform/analytics';

import { appName } from 'tracking/constants';

import { createEventTracker, createLinkTracker, LINK_TIMEOUT } from './utils';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
}));

describe('segment service utils', () => {
  describe('createEventTracker', () => {
    const name = 'aName';
    const options = { field1: 'some data', field2: 'other data' };
    it('call sendTrackEvent', () => {
      createEventTracker(name, options)();
      expect(sendTrackEvent).toHaveBeenCalledWith(name, { ...options, app_name: appName });
    });
  });

  describe('createLinkTracker', () => {
    const tracker = jest.fn();
    const href = 'https://www.example.com';
    const event = { preventDefault: jest.fn() };
    it('call tracker', () => {
      createLinkTracker(tracker, href)(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(tracker).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), LINK_TIMEOUT);
    });
  });
});
