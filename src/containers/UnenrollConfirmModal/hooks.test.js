import { thunkActions } from 'data/redux';
import { useValueCallback } from 'hooks';
import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  useValueCallback: jest.fn((cb, prereqs) => ({ useValueCallback: { cb, prereqs } })),
}));

jest.mock('data/redux/thunkActions/app', () => ({
  refreshList: jest.fn((args) => ({ refreshList: args })),
  unenrollFromCourse: jest.fn((...args) => ({ unenrollFromCourse: args })),
}));

const state = new MockUseState(hooks);
const testValue = 'test-value';
let out;

describe('UnenrollConfirmModal hooks', () => {
  const dispatch = jest.fn();
  const closeModal = jest.fn();
  const cardId = 'test-card-id';

  const createUseUnenrollReasons = () => hooks.useUnenrollReasons({ dispatch, cardId });
  const createUseUnenrollData = () => hooks.useUnenrollData({ closeModal, dispatch, cardId });

  describe('state fields', () => {
    state.testGetter(state.keys.confirmed);
    state.testGetter(state.keys.customOption);
    state.testGetter(state.keys.isSkipped);
    state.testGetter(state.keys.selectedReason);
  });
  describe('useUnenrollReasons', () => {
    beforeEach(() => {
      state.mock();
      out = createUseUnenrollReasons();
    });
    afterEach(() => {
      state.restore();
    });
    describe('clear method', () => {
      it('resets selected and submitted reasons, custom option and isSkipped', () => {
        const { cb, prereqs } = out.clear.useCallback;
        expect(prereqs).toEqual([
          state.setState.selectedReason,
          state.setState.customOption,
          state.setState.isSkipped,
        ]);
        cb();
        expect(state.setState.selectedReason).toHaveBeenCalledWith(null);
        expect(state.setState.customOption).toHaveBeenCalledWith('');
        expect(state.setState.isSkipped).toHaveBeenCalledWith(false);
      });
    });
    test('customOption.value returns custom option', () => {
      state.mockVal(state.keys.customOption, testValue);
      expect(createUseUnenrollReasons().customOption.value).toEqual(testValue);
    });
    test('customOption.onChange returns valueCallback for setCustomOption', () => {
      expect(out.customOption.onChange).toEqual(useValueCallback(state.setState.customOption));
    });
    test('selected returns selectedReason', () => {
      state.mockVal(state.keys.selectedReason, testValue);
      expect(createUseUnenrollReasons().selected).toEqual(testValue);
    });
    test('selectedOption returns valueCallback for setSelectedReason', () => {
      expect(out.selectOption).toEqual(useValueCallback(state.setState.selectedReason));
    });
    test('isSkipped returns state value', () => {
      state.mockVal(state.keys.isSkipped, testValue);
      expect(createUseUnenrollReasons().isSkipped).toEqual(testValue);
    });
    test('skip returns callback that sets isSkipped to true and unenrolls with no reason', () => {
      const { cb, prereqs } = out.skip.useCallback;
      expect(prereqs).toEqual([cardId, dispatch, state.setState.isSkipped]);
      cb();
      expect(state.setState.isSkipped).toHaveBeenCalledWith(true);
      expect(dispatch).toHaveBeenCalledWith(thunkActions.app.unenrollFromCourse(cardId));
    });
    describe('isSubmitted', () => {
      it('returns false if submittedReason is null and not isSkipped', () => {
        expect(out.isSubmitted).toEqual(false);
      });
      it('returns true if isSkipped', () => {
        state.mockVal(state.keys.isSkipped, true);
        expect(createUseUnenrollReasons().isSubmitted).toEqual(true);
      });
    });
    describe('submit', () => {
      const customValue = 'custom-value';
      const loadHook = ({ selectedReason, customOption }) => {
        state.mockVal(state.keys.selectedReason, selectedReason);
        state.mockVal(state.keys.customOption, customOption);
        return createUseUnenrollReasons().submit.useCallback;
      };
      it('depends on customOption and selectedReason', () => {
        const { prereqs } = loadHook({ selectedReason: testValue, customOption: customValue });
        expect(prereqs).toContain(testValue);
        expect(prereqs).toContain(customValue);
      });
      it('dispatches unenroll action with submitted reason', () => {
        loadHook({ selectedReason: testValue, customOption: customValue }).cb();
        expect(dispatch).toHaveBeenCalledWith(
          thunkActions.app.unenrollFromCourse(cardId, testValue),
        );
        dispatch.mockClear();
        loadHook({ selectedReason: 'custom', customOption: customValue }).cb();
        expect(dispatch).toHaveBeenCalledWith(
          thunkActions.app.unenrollFromCourse(cardId, customValue),
        );
      });
    });
  });
  describe('modalHooks', () => {
    let mockReason;
    beforeEach(() => {
      mockReason = {
        isSubmitted: false,
        clear: jest.fn(),
      };
      state.mock();
      state.mockVal(state.keys.confirmed, testValue);
      hooks.useUnenrollReasons = jest.fn(() => mockReason);
      out = createUseUnenrollData();
    });
    afterEach(() => {
      state.restore();
      hooks.useUnenrollReasons.mockReset();
    });
    test('isConfirmed is forwarded from state', () => {
      expect(out.isConfirmed).toEqual(testValue);
    });
    test('confirm is callback that sets isConfirmed to true', () => {
      const { cb, prereqs } = out.confirm.useCallback;
      expect(prereqs).toEqual([state.setState.confirmed]);
      cb();
      expect(state.setState.confirmed).toHaveBeenCalledWith(true);
    });
    test('reason returns useUnenrollReasons output', () => {
      expect(out.reason).toEqual(mockReason);
    });
    describe('close', () => {
      test('callback based on reason, setIsConfirmed, and closeModal', () => {
        expect(out.close.useCallback.prereqs).toEqual([
          closeModal,
          mockReason,
          state.setState.confirmed,
        ]);
      });
      it('calls closeModal, sets isConfirmed to false, and calls reason.clear', () => {
        out.close.useCallback.cb();
        expect(closeModal).toHaveBeenCalled();
        expect(state.setState.confirmed).toHaveBeenCalledWith(false);
        expect(mockReason.clear).toHaveBeenCalled();
      });
    });
    describe('closeAndRefresh', () => {
      test('callback based on prerequisites', () => {
        expect(out.closeAndRefresh.useCallback.prereqs).toEqual([
          closeModal,
          dispatch,
          mockReason,
          state.setState.confirmed,
        ]);
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
        hooks.useUnenrollReasons = jest.fn(() => ({ ...mockReason, isSubmitted: true }));
        out = createUseUnenrollData();
        expect(out.modalState).toEqual(hooks.modalStates.finished);
      });
      it('returns modalStates.reason if confirmed and not submitted', () => {
        state.mockVal(state.keys.confirmed, true);
        out = createUseUnenrollData();
        expect(out.modalState).toEqual(hooks.modalStates.reason);
      });
      it('returns modalStates.confirm if not confirmed', () => {
        state.mockVal(state.keys.confirmed, false);
        out = createUseUnenrollData();
        expect(out.modalState).toEqual(hooks.modalStates.confirm);
      });
    });
  });
});
