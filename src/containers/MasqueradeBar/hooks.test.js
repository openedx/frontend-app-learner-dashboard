import { MockUseState } from 'testUtils';
import { thunkActions } from 'data/redux';

import { useSelector } from 'react-redux';
import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  thunkActions: {
    app: {
      masqueradeAs: jest.fn(),
      clearMasquerade: jest.fn(),
    },
  },
  selectors: {
    requests: {
      masquerade: jest.fn(),
    },
  },
}));

const state = new MockUseState(hooks);

describe('MasqueradeBar hooks', () => {
  let out;
  const authenticatedUser = {
    administrator: false,
    roles: ['staff'],
  };
  describe('state values', () => {
    state.testGetter(state.keys.masqueradeInput);
  });
  describe('useMasqueradeBarData', () => {
    beforeEach(() => {
      state.mock();
      out = hooks.useMasqueradeBarData({ authenticatedUser });
    });
    afterEach(state.restore);
    test('canMasquerade', () => {
      expect(out.canMasquerade).toEqual(true);
      out = hooks.useMasqueradeBarData({
        authenticatedUser: {
          administrator: false,
          roles: [],
        },
      });
      expect(out.canMasquerade).toEqual(false);
    });
    test('masqueradeError', () => {
      expect(out.masqueradeError).toBeUndefined();
      useSelector.mockReturnValueOnce({
        masqueradeError: 'test error',
      });
      out = hooks.useMasqueradeBarData({ authenticatedUser });
      expect(out.masqueradeError).toEqual('test error');
    });
    test('handleMasqueradeInputChange', () => {
      expect(state.stateVals.masqueradeInput).toEqual('');
      out.handleMasqueradeInputChange({ target: { value: 'test' } });
      expect(state.setState.masqueradeInput).toHaveBeenCalledWith('test');
    });
    test('handleMasqueradeSubmit', () => {
      out.handleMasqueradeSubmit('test')();
      expect(thunkActions.app.masqueradeAs).toHaveBeenCalledWith('test');
    });
    test('handleClearMasquerade', () => {
      out.handleClearMasquerade();
      expect(thunkActions.app.clearMasquerade).toHaveBeenCalled();
    });
  });
});
