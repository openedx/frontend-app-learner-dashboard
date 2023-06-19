import * as utils from './utils';

jest.unmock('./utils');

describe('app-level hooks', () => {
  describe('useValuecallback', () => {
    it('returns react callback with event target value', () => {
      const cb = val => ({ cb: val });
      const prereqs = ['test', 'prereqs'];
      const value = 'test-value';
      const out = utils.useValueCallback(cb, prereqs);
      expect(out.useCallback.cb({ target: { value } })).toEqual({ cb: value });
      expect(out.useCallback.prereqs).toEqual(prereqs);
    });
  });
});
