import { MockUseState } from 'testUtils';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import { useMasquerade } from 'data/context/MasqueradeProvider';

import * as hooks from './hooks';
import messages from './messages';

jest.mock('data/react-query/apiHooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('data/context/MasqueradeProvider', () => ({
  useMasquerade: jest.fn(),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage,
    }),
  };
});

const masqueradeAs = jest.fn();
const state = new MockUseState(hooks);
const testValue = 'test-value';

describe('MasqueradeBar hooks', () => {
  const authenticatedUser = {
    administrator: true,
  };
  const createHook = (masqueradeData = {}, user = authenticatedUser) => {
    useInitializeLearnerHome.mockReturnValue({
      isPending: masqueradeData.isMasqueradingPending || false,
      isError: masqueradeData.isMasqueradingFailed || false,
      error: masqueradeData.masqueradeErrorStatus || null,
    });
    useMasquerade.mockReturnValue({
      isMasquerading: masqueradeData.isMasquerading || false,
      setMasqueradeUser: masqueradeAs,
    });
    return hooks.useMasqueradeBarData({ authenticatedUser: user });
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
      out = createHook({ masqueradeErrorStatus: 500, isMasqueradingFailed: true, isMasquerading: true });
      expect(out.masqueradeErrorMessage).not.toBeNull();
    });
    test('isMasqueradePending', () => {
      let out = createHook();
      expect(out.isMasqueradingPending).toEqual(false);
      out = createHook({ isMasqueradingPending: true, isMasquerading: true });
      expect(out.isMasqueradingPending).toEqual(true);
    });
    test('handleMasqueradeInputChange', () => {
      const out = createHook();
      expect(state.stateVals.masqueradeInput).toEqual('');
      out.handleMasqueradeInputChange({ target: { value: testValue } });
      expect(state.setState.masqueradeInput).toHaveBeenCalledWith(testValue);
    });
    test('handleMasqueradeSubmit', () => {
      const out = createHook();
      const preventDefault = jest.fn();
      // make sure submit doesn't refresh the page
      out.handleMasqueradeSubmit(testValue)({
        preventDefault,
      });
      expect(masqueradeAs).toHaveBeenCalledWith(testValue);
      expect(preventDefault).toHaveBeenCalled();
    });
    test('handleClearMasquerade', () => {
      const out = createHook();
      out.handleClearMasquerade();
      expect(masqueradeAs).toHaveBeenCalledWith(undefined);
      expect(state.setState.masqueradeInput).toHaveBeenCalledWith('');
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
