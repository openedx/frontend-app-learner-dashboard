import React from 'react';
import { waitFor } from '@testing-library/react';

import { MockUseState } from 'testUtils';
import { RequestStates } from 'data/constants/requests';
import { reduxHooks } from 'hooks';
import { wait } from './utils';

import api from './api';
import * as hooks from './hooks';

jest.mock('./api', () => ({
  fetchProductRecommendations: jest.fn(),
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCurrentCourseList: jest.fn(),
    useHasCourses: jest.fn(),
    useHasAvailableDashboards: jest.fn(),
    useRequestIsPending: jest.fn(),
  },
}));

const state = new MockUseState(hooks);
const mostRecentCourseRunKey = 'course ID 1';

const courses = [
  {
    courseRun: {
      courseId: mostRecentCourseRunKey,
    },
  },
  {
    courseRun: {
      courseId: 'course ID 2',
    },
  },
];

const courseListData = {
  visible: courses,
  numPages: 0,
};

let output;
describe('ProductRecommendations hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('state fields', () => {
    state.testGetter(state.keys.requestState);
    state.testGetter(state.keys.data);
  });

  describe('useMostRecentCourseRunKey', () => {
    it('returns the courseId of the first course in the sorted visible array', () => {
      reduxHooks.useCurrentCourseList.mockReturnValueOnce(courseListData);

      expect(hooks.useMostRecentCourseRunKey()).toBe(mostRecentCourseRunKey);
    });
  });

  describe('useShowRecommendationsFooter', () => {
    // TODO: Update when hardcoded value is removed
    it('returns whether the footer widget should show', () => {
      reduxHooks.useHasCourses.mockReturnValueOnce(true);
      reduxHooks.useHasAvailableDashboards.mockReturnValueOnce(false);
      reduxHooks.useRequestIsPending.mockReturnValueOnce(false);

      expect(hooks.useShowRecommendationsFooter()).toBeFalsy();
    });
  });

  describe('useFetchProductRecommendations', () => {
    describe('behavior', () => {
      describe('useEffect call', () => {
        let calls;
        let cb;
        const response = { data: 'response data' };
        const setRequestState = jest.fn();
        const setData = jest.fn();
        beforeEach(() => {
          reduxHooks.useCurrentCourseList.mockReturnValue(courseListData);
          hooks.useFetchProductRecommendations(setRequestState, setData);
          ({ calls } = React.useEffect.mock);
          ([[cb]] = calls);
        });
        it('calls useEffect once', () => {
          expect(calls.length).toEqual(1);
        });
        it('calls fetchProductRecommendations with the most recently enrolled courseId', () => {
          api.fetchProductRecommendations.mockReturnValueOnce(Promise.resolve(response));
          cb();
          expect(api.fetchProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
        });
        describe('successful fetch on mounted component', () => {
          it('sets the request state to completed and loads response', async () => {
            let resolveFn;
            api.fetchProductRecommendations.mockReturnValueOnce(new Promise(resolve => {
              resolveFn = resolve;
            }));
            cb();
            expect(api.fetchProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
            resolveFn(response);
            await waitFor(() => {
              expect(setRequestState).toHaveBeenCalledWith(RequestStates.completed);
              expect(setData).toHaveBeenCalledWith(response.data);
            });
          });
        });
        describe('successful fetch on unmounted component', () => {
          it('does not set the state', async () => {
            let resolveFn;
            api.fetchProductRecommendations.mockReturnValueOnce(new Promise(resolve => {
              resolveFn = resolve;
            }));
            const unMount = cb();
            expect(api.fetchProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
            unMount();
            resolveFn(response);
            await wait(10);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
          });
        });
        describe('unsuccessful fetch on mounted component', () => {
          it('sets the request state to failed and does not set the data state', async () => {
            let rejectFn;
            api.fetchProductRecommendations.mockReturnValueOnce(new Promise((resolve, reject) => {
              rejectFn = reject;
            }));
            cb();
            expect(api.fetchProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
            rejectFn();
            await waitFor(() => {
              expect(setRequestState).toHaveBeenCalledWith(RequestStates.failed);
              expect(setData).not.toHaveBeenCalled();
            });
          });
        });
        describe('unsuccessful fetch on unmounted component', () => {
          it('does not set the state', async () => {
            let rejectFn;
            api.fetchProductRecommendations.mockReturnValueOnce(new Promise((resolve, reject) => {
              rejectFn = reject;
            }));
            const unMount = cb();
            expect(api.fetchProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
            unMount();
            rejectFn();
            await wait(10);
            expect(setRequestState).not.toHaveBeenCalled();
            expect(setData).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
  describe('useProductRecommendationsData', () => {
    let fetchSpy;
    beforeEach(() => {
      state.mock();
      fetchSpy = jest.spyOn(hooks, 'useFetchProductRecommendations').mockImplementationOnce(() => {});
      output = hooks.useProductRecommendationsData();
    });
    it('calls useFetchProductRecommendations with setRequestState and setData', () => {
      expect(fetchSpy).toHaveBeenCalledWith(state.setState.requestState, state.setState.data);
    });
    it('initializes requestState as RequestStates.pending', () => {
      state.expectInitializedWith(state.keys.requestState, RequestStates.pending);
    });
    describe('return values', () => {
      describe('when the request is completed, with returned response object', () => {
        const mockResponse = { crossProductCourses: {}, amplitudeCourses: {} };
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.completed);
          state.mockVal(state.keys.data, mockResponse);
          output = hooks.useProductRecommendationsData();
        });
        it('is not loading', () => {
          expect(output.isLoading).toEqual(false);
        });
        it('is loaded', () => {
          expect(output.isLoaded).toEqual(true);
        });
        it('has not failed', () => {
          expect(output.hasFailed).toEqual(false);
        });
        it('returns country code', () => {
          expect(output.productRecommendations).toEqual(mockResponse);
        });
      });
      describe('when the request is pending', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.pending);
          state.mockVal(state.keys.data, {});
          output = hooks.useProductRecommendationsData();
        });
        it('is loading', () => {
          expect(output.isLoading).toEqual(true);
        });
        it('is not loaded', () => {
          expect(output.isLoaded).toEqual(false);
        });
        it('has not failed', () => {
          expect(output.hasFailed).toEqual(false);
        });
        it('returns empty object', () => {
          expect(output.productRecommendations).toEqual({});
        });
      });
      describe('when the request has failed', () => {
        beforeEach(() => {
          state.mockVal(state.keys.requestState, RequestStates.failed);
          state.mockVal(state.keys.data, {});
          output = hooks.useProductRecommendationsData();
        });
        it('is not loading', () => {
          expect(output.isLoading).toEqual(false);
        });
        it('is not loaded', () => {
          expect(output.isLoaded).toEqual(false);
        });
        it('has failed', () => {
          expect(output.hasFailed).toEqual(true);
        });
        it('returns empty object', () => {
          expect(output.productRecommendations).toEqual({});
        });
      });
    });
  });
});
