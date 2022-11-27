import { MockUseState } from 'testUtils';

import { configuration } from '../../config';
import { getCookie, setCookie } from '../../utils/cookies';

import * as hooks from './hooks';

jest.mock('../../utils/cookies', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}));
jest.mock('../../config', () => ({
  configuration: {
    INTERVIEW_WIDGET_SIGNUP_URL: 'https://test.example.com',
    INTERVIEW_WIDGET_DISMISS_COOKIE_NAME: 'test-cookie',
  },
}));

const state = new MockUseState(hooks);

describe('InterviewWidgetHooks', () => {
  describe('useDismissPanel', () => {
    let out;
    beforeEach(() => {
      state.mock();
      out = hooks.useDismissPanel();
    });
    afterEach(state.restore);
    it('should show if dismiss cookie not set', () => {
      expect(out.hideWidget).toEqual(false);
    });
    it('should hide if dismiss cookie is set', () => {
      getCookie.mockReturnValue(true);
      out = hooks.useDismissPanel();
      expect(out.hideWidget).toEqual(true);
    });
    it('should hide if not configured', () => {
      configuration.INTERVIEW_WIDGET_SIGNUP_URL = '';
      expect(out.hideWidget).toEqual(true);
    });
    it('should set cookie and hide on dismiss', () => {
      out.handleDismiss();
      expect(setCookie).toHaveBeenCalled();
      state.expectSetStateCalledWith(state.keys.hideWidget, true);
    });
  });
});
