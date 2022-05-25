import * as hooks from './hooks';

jest.unmock('./hooks');

describe('app-level hooks', () => {
  describe('nullMethod', () => {
    it('returns an empty object', () => {
      expect(hooks.nullMethod()).toEqual({});
    });
  });
});
