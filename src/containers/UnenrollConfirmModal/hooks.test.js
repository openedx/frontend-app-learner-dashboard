import { MockUseState } from 'testUtils';
import { thunkActions } from 'data/redux';
import * as hooks from './hooks';

jest.mock('data/redux/thunkActions/app', () => ({
  refreshList: jest.fn((args) => ({ refreshList: args })),
}));

const state = new MockUseState(hooks);
const testValue = 'test-value';
let out;
let hook;

describe('UnenrollConfirmModal hooks', () => {
  describe('state fields', () => {
    state.testGetter(state.keys.confirmed);
    state.testGetter(state.keys.customOption);
    state.testGetter(state.keys.isSkipped);
    state.testGetter(state.keys.selectedReason);
    state.testGetter(state.keys.submittedReason);
  });
  describe('valueCallback', () => {
    describe('returned react callback', () => {
      test('calls passed method with event value and prereqs', () => {
        const cb = jest.fn();
        const prereqs = ['test', 'values'];
        const returned = hooks.valueCallback(cb, prereqs).useCallback;
        expect(returned.prereqs).toEqual(prereqs);
        returned.cb({ target: { value: testValue } });
        expect(cb).toHaveBeenCalledWith(testValue);
      });
      test('calls passed method with event value and no prereqs if not passed', () => {
        const cb = jest.fn();
        const returned = hooks.valueCallback(cb).useCallback;
        expect(returned.prereqs).toEqual([]);
        returned.cb({ target: { value: testValue } });
        expect(cb).toHaveBeenCalledWith(testValue);
      });
    });
  });
  describe('unenrollReasons', () => {
    const mockValueCB = (cb) => ({ callback: cb });
    beforeEach(() => {
      hook = hooks.unenrollReasons;
      state.mock();
      hooks.valueCallback = jest.fn(mockValueCB);
      out = hook();
    });
    afterEach(() => {
      state.restore();
      hooks.valueCallback.mockClear();
    });
    describe('clear method', () => {
      it('resets selected and submitted reasons, custom option and isSkipped', () => {
        const { cb, prereqs } = out.clear.useCallback;
        expect(prereqs).toEqual([]);
        cb();
        expect(state.setState.selectedReason).toHaveBeenCalledWith(null);
        expect(state.setState.submittedReason).toHaveBeenCalledWith(null);
        expect(state.setState.customOption).toHaveBeenCalledWith('');
        expect(state.setState.isSkipped).toHaveBeenCalledWith(false);
      });
    });
    test('value returns submitted reason', () => {
      state.mockVal(state.keys.submittedReason, testValue);
      expect(hook().value).toEqual(testValue);
    });
    test('customOption.value returns custom option', () => {
      state.mockVal(state.keys.customOption, testValue);
      expect(hook().customOption.value).toEqual(testValue);
    });
    test('customOption.onChange returns valueCallback for setCustomOption', () => {
      expect(out.customOption.onChange).toEqual(mockValueCB(state.setState.customOption));
    });
    test('selected returns selectedReason', () => {
      state.mockVal(state.keys.selectedReason, testValue);
      expect(hook().selected).toEqual(testValue);
    });
    test('selectedOption returns valueCallback for setSelectedReason', () => {
      expect(out.selectOption).toEqual(mockValueCB(state.setState.selectedReason));
    });
    test('isSkipped returns state value', () => {
      state.mockVal(state.keys.isSkipped, testValue);
      expect(hook().isSkipped).toEqual(testValue);
    });
    test('skip returns callback based on isSkipped that sets isSkipped to true', () => {
      const { cb, prereqs } = out.skip.useCallback;
      expect(prereqs).toEqual([state.stateVals.isSkipped]);
      cb();
      expect(state.setState.isSkipped).toHaveBeenCalledWith(true);
    });
    describe('isSubmitted', () => {
      it('returns false if submittedReason is null and not isSkipped', () => {
        expect(out.isSubmitted).toEqual(false);
      });
      it('returns true if submittedReason is not null', () => {
        state.mockVal(state.keys.submittedReason, testValue);
        expect(hook().isSubmitted).toEqual(true);
      });
      it('returns true if isSkipped', () => {
        state.mockVal(state.keys.isSkipped, true);
        expect(hook().isSubmitted).toEqual(true);
      });
    });
    describe('submit', () => {
      it('sets customOption as submittedReason if selectedReason is custom', () => {
        state.mockVal(state.keys.selectedReason, 'custom');
        state.mockVal(state.keys.customOption, testValue);
        hook().submit.useCallback.cb();
        expect(state.setState.submittedReason).toHaveBeenCalledWith(testValue);
      });
      it('sets selectedReason as submittedReason if selectedReason is not custom', () => {
        state.mockVal(state.keys.selectedReason, testValue);
        state.mockVal(state.keys.customOption, 'customValue');
        hook().submit.useCallback.cb();
        expect(state.setState.submittedReason).toHaveBeenCalledWith(testValue);
      });
      it('depends on customOption and selectedReason', () => {
        const customValue = 'custom-value';
        state.mockVal(state.keys.selectedReason, testValue);
        state.mockVal(state.keys.customOption, customValue);
        const { prereqs } = hook().submit.useCallback;
        expect(prereqs).toContain(testValue);
        expect(prereqs).toContain(customValue);
      });
    });
  });
  describe('modalHooks', () => {
    const closeModal = jest.fn();
    const dispatch = jest.fn();
    let mockReason;
    beforeEach(() => {
      hook = hooks.modalHooks;
      mockReason = {
        isSubmitted: false,
        clear: jest.fn(),
      };
      state.mock();
      state.mockVal(state.keys.confirmed, testValue);
      hooks.unenrollReasons = jest.fn(() => mockReason);
      out = hook({ closeModal, dispatch });
    });
    afterEach(() => {
      state.restore();
      hooks.unenrollReasons.mockReset();
    });
    test('isConfirmed is forwarded from state', () => {
      expect(out.isConfirmed).toEqual(testValue);
    });
    test('confirm is no-prereqs callback that sets isConfirmed to true', () => {
      const { cb, prereqs } = out.confirm.useCallback;
      expect(prereqs).toEqual([]);
      cb();
      expect(state.setState.confirmed).toHaveBeenCalledWith(true);
    });
    test('reason returns unenrollReasons output', () => {
      expect(out.reason).toEqual(mockReason);
    });
    describe('close', () => {
      test('callback based on reason and isConfirmed', () => {
        expect(out.close.useCallback.prereqs).toEqual([mockReason, testValue]);
      });
      it('calls closeModal, sets isConfirmed to false, and calls reason.clear', () => {
        out.close.useCallback.cb();
        expect(closeModal).toHaveBeenCalled();
        expect(state.setState.confirmed).toHaveBeenCalledWith(false);
        expect(mockReason.clear).toHaveBeenCalled();
      });
    });
    describe('closeAndRefresh', () => {
      test('callback based on reason and isConfirmed', () => {
        expect(out.closeAndRefresh.useCallback.prereqs).toEqual([mockReason, testValue]);
      });
      it('calls closeModal, sets isConfirmed to false, and calls reason.clear', () => {
        out.closeAndRefresh.useCallback.cb();
        expect(closeModal).toHaveBeenCalled();
        expect(state.setState.confirmed).toHaveBeenCalledWith(false);
        expect(mockReason.clear).toHaveBeenCalled();
      });
      it('dispatches refreshList thunkAction', () => {
        out.closeAndRefresh.useCallback.cb();
        expect(dispatch).toHaveBeenCalledWith(thunkActions.app.refreshList());
      });
    });
    describe('modalState', () => {
      it('returns modalStates.finished if confirmed and submitted', () => {
        state.mockVal(state.keys.confirmed, true);
        hooks.unenrollReasons = jest.fn(() => ({ ...mockReason, isSubmitted: true }));
        out = hook({ closeModal, dispatch });
        expect(out.modalState).toEqual(hooks.modalStates.finished);
      });
      it('returns modalStates.reason if confirmed and not submitted', () => {
        state.mockVal(state.keys.confirmed, true);
        out = hook({ closeModal, dispatch });
        expect(out.modalState).toEqual(hooks.modalStates.reason);
      });
      it('returns modalStates.confirm if not confirmed', () => {
        state.mockVal(state.keys.confirmed, false);
        out = hook({ closeModal, dispatch });
        expect(out.modalState).toEqual(hooks.modalStates.confirm);
      });
    });
  });
});
