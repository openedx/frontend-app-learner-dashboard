import React from 'react';
import { waitFor } from '@testing-library/react';

import { MockUseState } from 'testUtils';
import { RequestStates } from 'data/constants/requests';
import { reduxHooks } from 'hooks';
import { useWindowSize } from '@edx/paragon';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useExperimentContext } from 'ExperimentContext';
import { recommendationsViewed } from './track';
import { activateProductRecommendationsExperiment, trackProductRecommendationsViewed } from './optimizelyExperiment';
import { control, treatment, noExperiment } from './constants';
import { wait } from './utils';
import { mockCrossProductResponse, mockAmplitudeResponse } from './testData';

import api from './api';
import * as hooks from './hooks';

jest.mock('./api', () => ({
  fetchCrossProductRecommendations: jest.fn(),
  fetchAmplitudeRecommendations: jest.fn(),
  fetchRecommendationsContext: jest.fn(),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(),
}));

jest.mock('ExperimentContext', () => ({
  useExperimentContext: jest.fn(),
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCurrentCourseList: jest.fn(),
    useEnterpriseDashboardData: jest.fn(),
    useRequestIsCompleted: jest.fn(),
  },
}));

jest.mock('./track', () => ({
  recommendationsViewed: jest.fn(),
}));

jest.mock('./optimizelyExperiment', () => ({
  trackProductRecommendationsViewed: jest.fn(),
  activateProductRecommendationsExperiment: jest.fn(),
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

const populatedCourseListData = {
  visible: courses,
  numPages: 0,
};

const emptyCourseListData = {
  visible: [],
  numPages: 0,
};

let output;
describe('ProductRecommendations hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    getAuthenticatedUser.mockImplementation(() => ({ userId: '1' }));
  });

  describe('state fields', () => {
    state.testGetter(state.keys.requestState);
    state.testGetter(state.keys.data);
  });

  describe('useMostRecentCourseRunKey', () => {
    it('returns the courseId of the first course in the sorted visible array', () => {
      reduxHooks.useCurrentCourseList.mockReturnValueOnce(populatedCourseListData);

      expect(hooks.useMostRecentCourseRunKey()).toBe(mostRecentCourseRunKey);
    });
  });

  describe('useIsMobile', () => {
    it('returns false if the width of the window is greater than or equal to 576px', () => {
      useWindowSize
        .mockReturnValueOnce({ width: 576, height: 943 })
        .mockReturnValueOnce({ width: 1400, height: 943 });

      expect(hooks.useIsMobile()).toBeFalsy();
      expect(hooks.useIsMobile()).toBeFalsy();
    });

    it('returns true if the width of the window is less than 576px', () => {
      useWindowSize.mockReturnValueOnce({ width: 575, height: 943 });

      expect(hooks.useIsMobile()).toBeTruthy();
    });
  });

  describe('useShowRecommendationsFooter', () => {
    it('returns the experiment object, stating if the experiment has activated and the variant', () => {
      useExperimentContext
        .mockImplementationOnce(() => ({ experiment: { inRecommendationsVariant: true, isExperimentActive: false } }));

      const { inRecommendationsVariant, isExperimentActive } = hooks.useShowRecommendationsFooter();

      expect(useExperimentContext).toHaveBeenCalled();
      expect(inRecommendationsVariant).toBeTruthy();
      expect(isExperimentActive).toBeFalsy();
    });
  });

  describe('useActivateRecommendationsExperiment', () => {
    describe('behavior', () => {
      describe('useEffect call', () => {
        let cb;
        let calls;
        let prereqs;
        const setExperiment = jest.fn();
        const setCountryCode = jest.fn();
        const userAttributes = { is_enterprise_user: false, is_mobile_user: false, location: 'za' };

        const optimizelyExperimentMock = ({
          experimentActivated = false,
          inExperimentVariant = false,
        }) => ({
          experimentActivated,
          inExperimentVariant,
        });

        const experimentContextMock = ({
          isExperimentActive = false,
          inRecommendationsVariant = true,
          countryCode = 'ZA',
          isMobile = false,
        }) => ({
          experiment: { isExperimentActive, inRecommendationsVariant },
          countryCode,
          isMobile,
          setExperiment,
          setCountryCode,
        });

        const setUp = (
          isCompleted,
          experimentContext = experimentContextMock({}),
          optimizelyExperiment = optimizelyExperimentMock({}),
        ) => {
          reduxHooks.useCurrentCourseList.mockReturnValueOnce(populatedCourseListData);
          reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
          reduxHooks.useRequestIsCompleted.mockReturnValueOnce(isCompleted);
          useExperimentContext.mockReturnValueOnce(experimentContext);
          activateProductRecommendationsExperiment.mockReturnValueOnce(optimizelyExperiment);

          hooks.useActivateRecommendationsExperiment();

          ({ calls } = React.useEffect.mock);
          ([[cb, prereqs]] = calls);
        };

        it('runs when isExperimentActive or countryCode changes (prereqs)', () => {
          setUp(true);
          expect(prereqs).toEqual([false, 'ZA']);
          expect(calls.length).toEqual(1);
        });
        describe('when the request state is not completed', () => {
          it('does not activate or send any events', () => {
            setUp(false);
            cb();
            expect(activateProductRecommendationsExperiment).not.toHaveBeenCalled();
            expect(trackProductRecommendationsViewed).not.toHaveBeenCalled();
            expect(recommendationsViewed).not.toHaveBeenCalled();
          });
        });
        describe('when the experiment is active', () => {
          it('does not activate or send any events', () => {
            setUp(true, experimentContextMock({ isExperimentActive: true }));
            cb();
            expect(activateProductRecommendationsExperiment).not.toHaveBeenCalled();
            expect(trackProductRecommendationsViewed).not.toHaveBeenCalled();
            expect(recommendationsViewed).not.toHaveBeenCalled();
          });
        });
        describe('when the experiment is inactive but user country code has not been fetched', () => {
          it('does not activate or send any events', () => {
            setUp(true, experimentContextMock({ countryCode: null }));
            cb();
            expect(activateProductRecommendationsExperiment).not.toHaveBeenCalled();
            expect(trackProductRecommendationsViewed).not.toHaveBeenCalled();
            expect(recommendationsViewed).not.toHaveBeenCalled();
          });
        });
        describe('when the experiment is inactive and user country code has been fetched', () => {
          it('activates the experiment and sends viewed event for control group', () => {
            setUp(
              true,
              experimentContextMock({}),
              optimizelyExperimentMock({ experimentActivated: true, inExperimentVariant: false }),
            );
            cb();
            expect(activateProductRecommendationsExperiment).toHaveBeenCalledWith('1', userAttributes);
            expect(setExperiment).toHaveBeenCalled();
            expect(trackProductRecommendationsViewed).toHaveBeenCalledWith('1');
            expect(recommendationsViewed).toHaveBeenCalledWith(true, control, mostRecentCourseRunKey);
          });
          it('activates the experiment and does not sends viewed event for treatment group', () => {
            setUp(
              true,
              experimentContextMock({ countryCode: '' }),
              optimizelyExperimentMock({ experimentActivated: true, inExperimentVariant: true }),
            );
            cb();
            expect(activateProductRecommendationsExperiment).toHaveBeenCalledWith('1', { ...userAttributes, location: '' });
            expect(setExperiment).toHaveBeenCalled();
            expect(trackProductRecommendationsViewed).not.toHaveBeenCalled();
            expect(recommendationsViewed).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('useSendViewedEvents', () => {
    describe('behavior', () => {
      describe('useEffect call', () => {
        let cb;
        let calls;
        let prereqs;
        const { completed, pending } = RequestStates;

        const setUp = (requestState, response) => {
          reduxHooks.useCurrentCourseList.mockReturnValueOnce(populatedCourseListData);
          hooks.useSendViewedEvents(requestState, response);
          ({ calls } = React.useEffect.mock);
          ([[cb, prereqs]] = calls);
        };

        it('runs when data or requestState changes (prereqs)', () => {
          setUp(completed, mockCrossProductResponse);
          expect(prereqs).toEqual([mockCrossProductResponse, completed]);
          expect(calls.length).toEqual(1);
        });
        describe('when the request state is not completed', () => {
          it('does not send any events', () => {
            setUp(pending, mockCrossProductResponse);
            cb();
            expect(trackProductRecommendationsViewed).not.toHaveBeenCalled();
            expect(recommendationsViewed).not.toHaveBeenCalled();
          });
        });
        describe('when the request state is completed', () => {
          describe('with crossProduct data that has 2 cross product courses', () => {
            it('sends out recommendations viewed event for "treatment" group', () => {
              setUp(completed, mockCrossProductResponse);
              cb();
              expect(trackProductRecommendationsViewed).toHaveBeenCalledWith('1');
              expect(recommendationsViewed).toHaveBeenCalledWith(false, treatment, mostRecentCourseRunKey);
            });
          });
          describe('with amplitude data and no cross product data', () => {
            it('sends out recommendations viewed event for "no experiment" group', () => {
              setUp(completed, mockAmplitudeResponse);
              cb();
              expect(trackProductRecommendationsViewed).toHaveBeenCalledWith('1');
              expect(recommendationsViewed).toHaveBeenCalledWith(true, noExperiment, mostRecentCourseRunKey);
            });
          });
        });
      });
    });
  });

  describe('useFetchRecommendations', () => {
    describe('behavior', () => {
      describe('useEffect call', () => {
        let calls;
        let cb;
        const response = { data: 'response data' };
        const setRequestState = jest.fn();
        const setData = jest.fn();

        const setUp = (mockCourseListData) => {
          reduxHooks.useCurrentCourseList.mockReturnValue(mockCourseListData);
          hooks.useFetchRecommendations(setRequestState, setData);
          ({ calls } = React.useEffect.mock);
          ([[cb]] = calls);
        };

        it('calls useEffect once', () => {
          setUp(populatedCourseListData);
          expect(calls.length).toEqual(1);
        });
        describe('without no courseId due to no enrolled courses', () => {
          it('calls fetchAmplitudeRecommendations', () => {
            setUp(emptyCourseListData);
            api.fetchAmplitudeRecommendations.mockReturnValueOnce(Promise.resolve(response));
            cb();
            expect(api.fetchAmplitudeRecommendations).toHaveBeenCalled();
          });
        });
        describe('with most recently enrolled courseId', () => {
          it('calls fetchCrossProductRecommendations with the most recently enrolled courseId', () => {
            setUp(populatedCourseListData);
            api.fetchCrossProductRecommendations.mockReturnValueOnce(Promise.resolve(response));
            cb();
            expect(api.fetchCrossProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
          });
        });
        describe('fetching cross product recommendations', () => {
          beforeEach(() => setUp(populatedCourseListData));

          describe('successful fetch on mounted component', () => {
            it('sets the request state to completed and loads response', async () => {
              let resolveFn;
              api.fetchCrossProductRecommendations.mockReturnValueOnce(new Promise(resolve => {
                resolveFn = resolve;
              }));
              cb();
              expect(api.fetchCrossProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
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
              api.fetchCrossProductRecommendations.mockReturnValueOnce(new Promise(resolve => {
                resolveFn = resolve;
              }));
              const unMount = cb();
              expect(api.fetchCrossProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
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
              api.fetchCrossProductRecommendations.mockReturnValueOnce(new Promise((resolve, reject) => {
                rejectFn = reject;
              }));
              cb();
              expect(api.fetchCrossProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
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
              api.fetchCrossProductRecommendations.mockReturnValueOnce(new Promise((resolve, reject) => {
                rejectFn = reject;
              }));
              const unMount = cb();
              expect(api.fetchCrossProductRecommendations).toHaveBeenCalledWith(mostRecentCourseRunKey);
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
        describe('fetching Amplitude recommendations', () => {
          beforeEach(() => setUp(emptyCourseListData));

          describe('successful fetch on mounted component', () => {
            it('sets the request state to completed and loads response', async () => {
              let resolveFn;
              api.fetchAmplitudeRecommendations.mockReturnValueOnce(new Promise(resolve => {
                resolveFn = resolve;
              }));
              cb();
              expect(api.fetchAmplitudeRecommendations).toHaveBeenCalled();
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
              api.fetchAmplitudeRecommendations.mockReturnValueOnce(new Promise(resolve => {
                resolveFn = resolve;
              }));
              const unMount = cb();
              expect(api.fetchAmplitudeRecommendations).toHaveBeenCalled();
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
              api.fetchAmplitudeRecommendations.mockReturnValueOnce(new Promise((resolve, reject) => {
                rejectFn = reject;
              }));
              cb();
              expect(api.fetchAmplitudeRecommendations).toHaveBeenCalled();
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
              api.fetchAmplitudeRecommendations.mockReturnValueOnce(new Promise((resolve, reject) => {
                rejectFn = reject;
              }));
              const unMount = cb();
              expect(api.fetchAmplitudeRecommendations).toHaveBeenCalled();
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
  });
  describe('useProductRecommendationsData', () => {
    let fetchRecommendationsSpy;
    let sendViewedEventsSpy;
    beforeEach(() => {
      state.mock();
      fetchRecommendationsSpy = jest.spyOn(hooks, 'useFetchRecommendations').mockImplementationOnce(() => {});
      sendViewedEventsSpy = jest.spyOn(hooks, 'useSendViewedEvents').mockImplementationOnce(() => {});
      output = hooks.useProductRecommendationsData();
    });
    it('calls useFetchRecommendations with setRequestState and setData', () => {
      expect(fetchRecommendationsSpy).toHaveBeenCalledWith(state.setState.requestState, state.setState.data);
    });
    it('calls useFetchViewedEvents with requestState and data', () => {
      expect(sendViewedEventsSpy).toHaveBeenCalledWith(state.stateVals.requestState, state.stateVals.data);
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
