import React from 'react';

import { MockUseState } from 'testUtils';
import { RequestStates } from 'data/constants/requests';

import api from './api';
import * as hooks from './hooks';

jest.mock('./api', () => ({
  fetchRecommendedCourses: jest.fn(),
}));

const state = new MockUseState(hooks);

const testList = [1, 2, 3];
let out;
describe('RecommendationsPanel hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('state fields', () => {
    state.testGetter(state.keys.requestState);
  });
  describe('useFetchCourse', () => {
    describe('behavior', () => {
      describe('useEffect call', () => {
        let calls;
        let cb;
        let prereqs;
        const response = 'test-response';
        const setRequestState = jest.fn();
        const setData = jest.fn();
        beforeEach(() => {
          out = hooks.useFetchCourses(setRequestState, setData);
          ({ calls } = React.useEffect.mock);
          ([[cb, prereqs]] = calls);
        });
        it('calls useEffect once', () => {
          expect(calls.length).toEqual(1);
        });
        it('it is only run once (no prereqs)', () => {
          expect(prereqs).toEqual([]);
        });
        it('calls fetchRecommendedCourses', () => {
          api.fetchRecommendedCourses.mockReturnValueOnce(Promise.resolve(response));
          cb();
          expect(api.fetchRecommendedCourses).toHaveBeenCalledWith();
        });
        describe('successful fetch on mounted component', () => {
          it('sets request state to completed and loads response', async () => {
            let resolveFn;
            api.fetchRecommendedCourses.mockReturnValueOnce(new Promise(resolve => {
              resolveFn = resolve;
            }));
            cb();
            expect(api.fetchRecommendedCourses).toHaveBeenCalledWith();
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalledWith(response);
            await resolveFn(response);
            expect(setRequestState).toHaveBeenCalledWith(RequestStates.completed);
            expect(setData).toHaveBeenCalledWith(response);
          });
        });
        describe('successful fetch on unmounted component', () => {
          it('it does nothing', async () => {
            let resolveFn;
            api.fetchRecommendedCourses.mockReturnValueOnce(new Promise(resolve => {
              resolveFn = resolve;
            }));
            const unMount = cb();
            expect(api.fetchRecommendedCourses).toHaveBeenCalledWith();
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalledWith(response);
            unMount();
            await resolveFn(response);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
  describe('useRecommendationPanelData', () => {
    let fetchSpy;
    beforeEach(() => {
      state.mock();
      fetchSpy = jest.spyOn(hooks, 'useFetchCourses').mockImplementationOnce(() => {});
      out = hooks.useRecommendationPanelData();
    });
    it('calls useFetchCourses with setRequestState and setData', () => {
      expect(fetchSpy).toHaveBeenCalledWith(state.setState.requestState, state.setState.data);
    });
    it('initializes requestState as RequestStates.pending', () => {
      state.expectInitializedWith(state.keys.requestState, RequestStates.pending);
    });
    it('initializes requestState as RequestStates.pending', () => {
      state.expectInitializedWith(state.keys.requestState, RequestStates.pending);
    });
    describe('output', () => {
      describe('request is completed, with returned courses', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.completed);
          state.mockVal(state.keys.data, { data: { courses: testList } });
          out = hooks.useRecommendationPanelData();
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
        it('returns passed courses list', () => {
          expect(out.courses).toEqual(testList);
        });
      });
      describe('personalize recommendation', () => {
        it('default to null', () => {
          state.mockVal(state.keys.data, {});
          out = hooks.useRecommendationPanelData();
          expect(out.isControl).toEqual(null);
        });
        it('is based on data', () => {
          const expectOutput = { test: 'abirary' };
          state.mockVal(state.keys.data, { data: { isControl: expectOutput } });
          out = hooks.useRecommendationPanelData();
          expect(out.isControl).toEqual(expectOutput);
        });
      });
      describe('request is completed, with no returned courses', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.completed);
          state.mockVal(state.keys.data, { data: { courses: [] } });
          out = hooks.useRecommendationPanelData();
        });
        it('is not loading', () => {
          expect(out.isLoading).toEqual(false);
        });
        it('is not loaded', () => {
          expect(out.isLoaded).toEqual(false);
        });
        it('is failed', () => {
          expect(out.isFailed).toEqual(true);
        });
        it('returns empty courses list', () => {
          expect(out.courses).toEqual([]);
        });
      });
      describe('request is failed', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.failed);
          state.mockVal(state.keys.data, {});
          out = hooks.useRecommendationPanelData();
        });
        it('is not loading', () => {
          expect(out.isLoading).toEqual(false);
        });
        it('is not loaded', () => {
          expect(out.isLoaded).toEqual(false);
        });
        it('is failed', () => {
          expect(out.isFailed).toEqual(true);
        });
        it('returns empty courses list', () => {
          expect(out.courses).toEqual([]);
        });
      });
      describe('request is pending', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.pending);
          state.mockVal(state.keys.data, {});
          out = hooks.useRecommendationPanelData();
        });
        it('is loading', () => {
          expect(out.isLoading).toEqual(true);
        });
        it('is not loaded', () => {
          expect(out.isLoaded).toEqual(false);
        });
        it('is not failed', () => {
          expect(out.isFailed).toEqual(false);
        });
        it('returns empty courses list', () => {
          expect(out.courses).toEqual([]);
        });
      });
    });
  });
});
