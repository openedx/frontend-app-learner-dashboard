import { MockUseState } from 'testUtils';
import { thunkActions, hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';
import messages from './messages';

jest.mock('data/redux', () => ({
  thunkActions: {
    app: {
      masqueradeAs: jest.fn(),
      clearMasquerade: jest.fn(),
    },
  },
  hooks: {
    useMasqueradeData: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

describe('MasqueradeBar hooks', () => {
  const authenticatedUser = {
    administrator: true,
  };
  const defaultMasqueradeData = {
    isMasquerading: false,
    isMasqueradingFailed: false,
    isMasqueradingPending: false,
    masqueradeErrorStatus: null,
  };
  const createHook = (masqueradeData = {}, user) => {
    appHooks.useMasqueradeData.mockReturnValueOnce({
      ...defaultMasqueradeData,
      ...masqueradeData,
    });
    return hooks.useMasqueradeBarData({ authenticatedUser: user || authenticatedUser });
  };

  describe('state values', () => {
    state.testGetter(state.keys.masqueradeInput);
  });
  describe('useMasqueradeBarData', () => {
    beforeEach(() => state.mock());
    afterEach(state.restore);
    test('canMasquerade', () => {
      const out = createHook();
      expect(out.canMasquerade).toEqual(true);
    });
    test('cannotMasquerade', () => {
      const out = createHook({}, { administrator: false });
      expect(out.canMasquerade).toEqual(false);
    });
    test('masqueradeErrorStatus', () => {
      let out = createHook();
      expect(out.masqueradeErrorMessage).toBeNull();
      out = createHook({ masqueradeErrorStatus: 0 });
      expect(out.masqueradeErrorMessage).not.toBeNull();
    });
    test('isMasqueradePending', () => {
      let out = createHook();
      expect(out.isMasqueradingPending).toEqual(false);
      out = createHook({ isMasqueradingPending: true });
      expect(out.isMasqueradingPending).toEqual(true);
    });
    test('handleMasqueradeInputChange', () => {
      const out = createHook();
      expect(state.stateVals.masqueradeInput).toEqual('');
      out.handleMasqueradeInputChange({ target: { value: 'test' } });
      expect(state.setState.masqueradeInput).toHaveBeenCalledWith('test');
    });
    test('handleMasqueradeSubmit', () => {
      const out = createHook();
      out.handleMasqueradeSubmit('test')();
      expect(thunkActions.app.masqueradeAs).toHaveBeenCalledWith('test');
    });
    test('handleClearMasquerade', () => {
      const out = createHook();
      out.handleClearMasquerade();
      expect(thunkActions.app.clearMasquerade).toHaveBeenCalled();
    });
  });

  describe('getMasqueradeErrorMessage', () => {
    test('null', () => {
      expect(hooks.getMasqueradeErrorMessage()).toBeNull();
    });
    test('404', () => {
      expect(hooks.getMasqueradeErrorMessage(404)).toEqual(messages.NoStudentFound);
    });
    test('default', () => {
      expect(hooks.getMasqueradeErrorMessage(500)).toEqual(messages.UnknownError);
    });
  });
});
