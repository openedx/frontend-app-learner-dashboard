import { thunkActions } from 'data/redux';
import { useValueCallback } from 'hooks';
import { MockUseState } from 'testUtils';

import * as hooks from './reasons';

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

describe('UnenrollConfirmModal reasons hooks', () => {
  const dispatch = jest.fn();
  const cardId = 'test-card-id';

  const createUseUnenrollReasons = () => hooks.useUnenrollReasons({ dispatch, cardId });

  describe('state fields', () => {
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
        out.clear();
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
    test('selectedOption returns valueCallback for setSelectedReason', () => {
      expect(out.selectOption).toEqual(useValueCallback(state.setState.selectedReason));
    });
    test('isSkipped returns state value', () => {
      state.mockVal(state.keys.isSkipped, testValue);
      expect(createUseUnenrollReasons().isSkipped).toEqual(testValue);
    });
    test('skip returns callback that sets isSkipped to true and unenrolls with no reason', () => {
      out.skip();
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
  });
});
