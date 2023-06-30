import { useState, useEffect } from 'react';
import { RequestStates, RequestKeys } from 'data/constants/requests';
import { StrictDict } from 'utils';
import { reduxHooks } from 'hooks';
import { SortKeys } from 'data/constants/app';
import { useWindowSize, breakpoints } from '@edx/paragon';
import api from './api';
import * as module from './hooks';

export const state = StrictDict({
  requestState: (val) => useState(val), // eslint-disable-line
  data: (val) => useState(val), // eslint-disable-line
});

export const useIsMobile = () => {
  const { width } = useWindowSize();
  return width < breakpoints.small.minWidth;
};

export const useShowRecommendationsFooter = () => {
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const hasRequestCompleted = reduxHooks.useRequestIsCompleted(RequestKeys.initialize);

  return {
    shouldShowFooter: false,
    shouldLoadFooter: hasRequestCompleted && !hasAvailableDashboards,
  };
};

export const useMostRecentCourseRunKey = () => {
  const mostRecentCourseRunKey = reduxHooks.useCurrentCourseList({
    sortBy: SortKeys.enrolled,
    filters: [],
    pageSize: 0,
  }).visible[0]?.courseRun?.courseId;

  return mostRecentCourseRunKey;
};

export const useFetchRecommendations = (setRequestState, setData) => {
  const courseRunKey = module.useMostRecentCourseRunKey();

  useEffect(() => {
    let isMounted = true;

    const handleSuccess = (response) => {
      if (isMounted) {
        setData(response.data);
        setRequestState(RequestStates.completed);
      }
    };

    const handleError = () => {
      if (isMounted) {
        setRequestState(RequestStates.failed);
      }
    };

    if (courseRunKey) {
      api
        .fetchCrossProductRecommendations(courseRunKey)
        .then(handleSuccess)
        .catch(handleError);
    } else {
      api
        .fetchAmplitudeRecommendations()
        .then(handleSuccess)
        .catch(handleError);
    }
    return () => {
      isMounted = false;
    };
    /* eslint-disable */
  }, []);
};

export const useProductRecommendationsData = () => {
  const [requestState, setRequestState] = module.state.requestState(RequestStates.pending);
  const [data, setData] = module.state.data({});
  module.useFetchRecommendations(setRequestState, setData);

  return {
    productRecommendations: data,
    isLoading: requestState === RequestStates.pending,
    isLoaded: requestState === RequestStates.completed,
    hasFailed: requestState === RequestStates.failed 
  };
};

export default { useProductRecommendationsData, useShowRecommendationsFooter, useIsMobile };
