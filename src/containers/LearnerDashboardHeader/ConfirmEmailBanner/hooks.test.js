import { MockUseState } from 'testUtils';
import { hooks as appHooks, thunkActions } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useEmailConfirmationData: jest.fn(),
  },
  thunkActions: {
    app: {
      sendConfirmEmail: jest.fn(),
    },
  },
}));

const emailConfirmation = {
  isNeeded: true,
};

const state = new MockUseState(hooks);

describe('ConfirmEmailBanner hooks', () => {
  let out;
  describe('state values', () => {
    state.testGetter(state.keys.showPageBanner);
    state.testGetter(state.keys.showConfirmModal);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useEmailConfirmationData', () => {
    beforeEach(() => state.mock());
    afterEach(state.restore);

    test('show page banner on unverified email', () => {
      appHooks.useEmailConfirmationData.mockReturnValueOnce({ ...emailConfirmation });
      out = hooks.useConfirmEmailBannerData();
      expect(out.isNeeded).toEqual(emailConfirmation.isNeeded);
      appHooks.useEmailConfirmationData.mockReturnValueOnce({ isNeeded: false });
    });

    test('hide page banner on verified email', () => {
      appHooks.useEmailConfirmationData.mockReturnValueOnce({ isNeeded: false });
      out = hooks.useConfirmEmailBannerData();
      expect(out.isNeeded).toEqual(false);
    });
  });

  describe('behavior', () => {
    beforeEach(() => {
      state.mock();
      appHooks.useEmailConfirmationData.mockReturnValueOnce({ ...emailConfirmation });
      out = hooks.useConfirmEmailBannerData();
    });
    afterEach(state.restore);
    test('closePageBanner', () => {
      out.closePageBanner();
      expect(state.values.showPageBanner).toEqual(false);
    });
    test('closeConfirmModal', () => {
      out.closeConfirmModal();
      expect(state.values.showConfirmModal).toEqual(false);
    });
    test('openConfirmModalButtonClick', () => {
      out.openConfirmModalButtonClick();
      expect(state.values.showConfirmModal).toEqual(true);
      expect(thunkActions.app.sendConfirmEmail).toBeCalled();
    });
    test('userConfirmEmailButtonClick', () => {
      out.userConfirmEmailButtonClick();
      expect(state.values.showConfirmModal).toEqual(false);
      expect(state.values.showPageBanner).toEqual(false);
    });
  });
});
