import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

const state = new MockUseState(hooks);

describe('CourseCardMenu hooks', () => {
  describe('state values', () => {
    state.testGetter(state.keys.isUnenrollConfirmVisible);
    state.testGetter(state.keys.isEmailSettingsVisible);
  });

  describe('useUnenrollData', () => {
    let out;
    beforeEach(() => {
      state.mock();
      out = hooks.useUnenrollData();
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isVisible).toEqual(state.stateVals.isUnenrollConfirmVisible);
    });

    test('show', () => {
      out.show();
      state.expectSetStateCalledWith(state.keys.isUnenrollConfirmVisible, true);
    });

    test('hide', () => {
      out.hide();
      state.expectSetStateCalledWith(state.keys.isUnenrollConfirmVisible, false);
    });
  });

  describe('useEmailSettings', () => {
    let out;
    beforeEach(() => {
      state.mock();
      out = hooks.useEmailSettings();
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isVisible).toEqual(state.stateVals.isEmailSettingsVisible);
    });

    test('show', () => {
      out.show();
      state.expectSetStateCalledWith(state.keys.isEmailSettingsVisible, true);
    });

    test('hide', () => {
      out.hide();
      state.expectSetStateCalledWith(state.keys.isEmailSettingsVisible, false);
    });
  });
});
