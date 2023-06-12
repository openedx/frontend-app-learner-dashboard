import { useState, useEffect } from 'react';

import { RequestStates, RequestKeys } from 'data/constants/requests';
import { StrictDict } from 'utils';
import { reduxHooks } from 'hooks';
import { SortKeys } from 'data/constants/app';
import api from './api';
import * as module from './hooks';

export const state = StrictDict({
  requestState: (val) => useState(val), // eslint-disable-line
  data: (val) => useState(val), // eslint-disable-line
});

export const useShowRecommendationsFooter = () => {
  const hasCourses = reduxHooks.useHasCourses();
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);

  // Hardcoded to not show until experiment related code is implemented
  return !initIsPending && hasCourses && !hasAvailableDashboards && false;
};

export const useMostRecentCourseRunKey = () => {
  const mostRecentCourse = reduxHooks.useCurrentCourseList({
    sortBy: SortKeys.enrolled,
    filters: [],
    pageSize: 0,
  }).visible[0].courseRun.courseId;

  return mostRecentCourse;
};

export const useFetchProductRecommendations = (setRequestState, setData) => {
  const courseRunKey = module.useMostRecentCourseRunKey();

  useEffect(() => {
    let isMounted = true;
    api
      .fetchProductRecommendations(courseRunKey)
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setRequestState(RequestStates.completed);
        }
      })
      .catch(() => {
        if (isMounted) {
          setRequestState(RequestStates.failed);
        }
      });
    return () => {
      isMounted = false;
    };
    /* eslint-disable */
  }, []);
};

export const useProductRecommendationsData = () => {
  const [requestState, setRequestState] = module.state.requestState(RequestStates.pending);
  const [data, setData] = module.state.data({});
  module.useFetchProductRecommendations(setRequestState, setData);

  return {
    productRecommendations: data,
    isLoading: requestState === RequestStates.pending,
    isLoaded: requestState === RequestStates.completed,
    hasFailed: requestState === RequestStates.failed 
  };
};

export default { useProductRecommendationsData, useShowRecommendationsFooter };
