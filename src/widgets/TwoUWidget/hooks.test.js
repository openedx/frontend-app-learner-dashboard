import React from 'react';

import { MockUseState } from 'testUtils';
import { RequestStates } from 'data/constants/requests';

import api from './api';
import * as hooks from './hooks';

jest.mock('./api', () => ({
  fetchTwoUWidgetContext: jest.fn(),
}));

const state = new MockUseState(hooks);

const countryCode = 'US';
let out;
describe('TwoUStaticCallOut hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('state fields', () => {
    state.testGetter(state.keys.requestState);
  });
  describe('useFetchTwoUWidgetContext', () => {
    describe('behavior', () => {
      describe('useEffect call', () => {
        let calls;
        let cb;
        const response = 'test-response';
        const setRequestState = jest.fn();
        const setData = jest.fn();
        beforeEach(() => {
          out = hooks.useFetchTwoUWidgetContext(setRequestState, setData);
          ({ calls } = React.useEffect.mock);
          ([[cb]] = calls);
        });
        it('calls useEffect once', () => {
          expect(calls.length).toEqual(1);
        });
        it('calls fetchTwoUWidgetContext', () => {
          api.fetchTwoUWidgetContext.mockReturnValueOnce(Promise.resolve(response));
          cb();
          expect(api.fetchTwoUWidgetContext).toHaveBeenCalledWith();
        });
      });
    });
  });
  describe('useTwoUWidgetData', () => {
    let fetchSpy;
    beforeEach(() => {
      state.mock();
      fetchSpy = jest.spyOn(hooks, 'useFetchTwoUWidgetContext').mockImplementationOnce(() => {});
      out = hooks.useTwoUWidgetData();
    });
    it('calls useFetchTwoUWidgetContext with setRequestState and setData', () => {
      expect(fetchSpy).toHaveBeenCalledWith(state.setState.requestState, state.setState.data);
    });
    it('initializes requestState as RequestStates.pending', () => {
      state.expectInitializedWith(state.keys.requestState, RequestStates.pending);
    });
    describe('output', () => {
      describe('request is completed, with returned country code', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.completed);
          state.mockVal(state.keys.data, { countryCode });
          out = hooks.useTwoUWidgetData();
        });
        it('is not loading', () => {
          expect(out.isLoading).toEqual(false);
        });
        it('is loaded', () => {
          expect(out.isLoaded).toEqual(true);
        });
        it('is not failed', () => {
          expect(out.isFailed).toEqual(false);
        });
        it('returns country code', () => {
          expect(out.countryCode).toEqual(countryCode);
        });
      });
    });
  });
});
