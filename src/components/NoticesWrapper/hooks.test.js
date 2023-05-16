import React from 'react';

import { MockUseState } from 'testUtils';

import { getConfig } from '@edx/frontend-platform';
import { getNotices } from './api';
import * as hooks from './hooks';

jest.mock('@edx/frontend-platform', () => ({ getConfig: jest.fn() }));
jest.mock('./api', () => ({ getNotices: jest.fn() }));

getConfig.mockReturnValue({ ENABLE_NOTICES: true });
const state = new MockUseState(hooks);

let hook;
describe('NoticesWrapper hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('state hooks', () => {
    state.testGetter(state.keys.isRedirected);
  });
  describe('useNoticesWrapperData', () => {
    beforeEach(() => {
      state.mock();
    });
    describe('behavior', () => {
      it('initializes state hooks', () => {
        hooks.useNoticesWrapperData();
        expect(hooks.state.isRedirected).toHaveBeenCalledWith();
      });
      describe('effects', () => {
        it('does not call notices if not enabled', () => {
          getConfig.mockReturnValueOnce({ ENABLE_NOTICES: false });
          hooks.useNoticesWrapperData();
          const [cb, prereqs] = React.useEffect.mock.calls[0];
          expect(prereqs).toEqual([state.setState.isRedirected]);
          cb();
          expect(getNotices).not.toHaveBeenCalled();
        });
        describe('getNotices call (if enabled) onLoad behavior', () => {
          it('does not redirect if there are no results', () => {
            hooks.useNoticesWrapperData();
            expect(React.useEffect).toHaveBeenCalled();
            const [cb, prereqs] = React.useEffect.mock.calls[0];
            expect(prereqs).toEqual([state.setState.isRedirected]);
            cb();
            expect(getNotices).toHaveBeenCalled();
            const { onLoad } = getNotices.mock.calls[0][0];
            onLoad({});
            expect(state.setState.isRedirected).not.toHaveBeenCalled();
            onLoad({ data: {} });
            expect(state.setState.isRedirected).not.toHaveBeenCalled();
            onLoad({ data: { results: [] } });
            expect(state.setState.isRedirected).not.toHaveBeenCalled();
          });
          it('redirects and set isRedirected if results are returned', () => {
            delete window.location;
            window.location = { replace: jest.fn(), href: 'test-old-href' };
            hooks.useNoticesWrapperData();
            const [cb, prereqs] = React.useEffect.mock.calls[0];
            expect(prereqs).toEqual([state.setState.isRedirected]);
            cb();
            expect(getNotices).toHaveBeenCalled();
            const { onLoad } = getNotices.mock.calls[0][0];
            const target = 'url-target';
            onLoad({ data: { results: [target] } });
            expect(state.setState.isRedirected).toHaveBeenCalledWith(true);
            expect(window.location.replace).toHaveBeenCalledWith(
              `${target}?next=${window.location.href}`,
            );
          });
        });
      });
    });
    describe('output', () => {
      it('forwards isRedirected from state call', () => {
        hook = hooks.useNoticesWrapperData();
        expect(hook.isRedirected).toEqual(state.stateVals.isRedirected);
      });
    });
  });
});
