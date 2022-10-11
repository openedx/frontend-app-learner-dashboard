import * as hooks from './hooks';

jest.unmock('./hooks');

describe('app-level hooks', () => {
  describe('nullMethod', () => {
    it('returns an empty object', () => {
      expect(hooks.nullMethod()).toEqual({});
    });
  });
  describe('useValuecallback', () => {
    it('returns react callback with event target value', () => {
      const cb = val => ({ cb: val });
      const prereqs = ['test', 'prereqs'];
      const value = 'test-value';
      const out = hooks.useValueCallback(cb, prereqs);
      expect(out.useCallback.cb({ target: { value } })).toEqual({ cb: value });
      expect(out.useCallback.prereqs).toEqual(prereqs);
    });
  });
});
