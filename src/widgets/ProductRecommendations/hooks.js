import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import { RequestStates, RequestKeys } from 'data/constants/requests';
import { StrictDict } from 'utils';
import { reduxHooks } from 'hooks';
import { SortKeys } from 'data/constants/app';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { useExperimentContext } from 'ExperimentContext';
import { control, treatment, noExperiment } from './constants';
import { activateProductRecommendationsExperiment, trackProductRecommendationsViewed } from './optimizelyExperiment';
import { recommendationsViewed } from './track';

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

export const useMostRecentCourseRunKey = () => {
  const mostRecentCourseRunKey = reduxHooks.useCurrentCourseList({
    sortBy: SortKeys.enrolled,
    filters: [],
    pageSize: 0,
  }).visible[0]?.courseRun?.courseId;

  return mostRecentCourseRunKey;
};

export const useActivateRecommendationsExperiment = () => {
  const enterpriseDashboardData = reduxHooks.useEnterpriseDashboardData();
  const hasRequestCompleted = reduxHooks.useRequestIsCompleted(RequestKeys.initialize);
  const mostRecentCourseRunKey = module.useMostRecentCourseRunKey();
  const userId = getAuthenticatedUser().userId.toString();

  const {
    experiment: { isExperimentActive },
    setExperiment,
    isMobile,
    countryCode,
  } = useExperimentContext();

  useEffect(() => {
    if (!isExperimentActive && countryCode !== null) {
      const activateExperiment = () => {
        const userAttributes = {
          is_mobile_user: isMobile,
          is_enterprise_user: !!enterpriseDashboardData,
          location: countryCode ? countryCode.toLowerCase() : '',
        };
        const experiment = activateProductRecommendationsExperiment(userId, userAttributes);

        setExperiment((prev) => ({
          ...prev,
          isExperimentActive: true,
          inRecommendationsVariant: experiment.inExperimentVariant,
        }));

        return experiment;
      };

      const sendViewedEvent = () => {
        trackProductRecommendationsViewed(userId);
        recommendationsViewed(true, control, mostRecentCourseRunKey);
      };

      if (hasRequestCompleted) {
        const { experimentActivated, inExperimentVariant } = activateExperiment();

        if (experimentActivated && !inExperimentVariant) {
          sendViewedEvent();
        }
      }
    }
  /* eslint-disable */
  }, [isExperimentActive, countryCode])
};

export const useShowRecommendationsFooter = () => {
  const { experiment } = useExperimentContext();

  return experiment;
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

export const useSendViewedEvents = (requestState, data) => {
  const mostRecentCourseRunKey = module.useMostRecentCourseRunKey();
  const userId = getAuthenticatedUser().userId.toString();

  useEffect(() => {
    if (requestState === RequestStates.completed) {
      if (data.crossProductCourses?.length === 2) {
        trackProductRecommendationsViewed(userId);
        recommendationsViewed(false, treatment, mostRecentCourseRunKey);
      } else {
        trackProductRecommendationsViewed(userId);
        recommendationsViewed(true, noExperiment, mostRecentCourseRunKey);
      }
    }
  }, [data, requestState])
}

export const useProductRecommendationsData = () => {
  const [requestState, setRequestState] = module.state.requestState(RequestStates.pending);
  const [data, setData] = module.state.data({});

  module.useFetchRecommendations(setRequestState, setData);
  module.useSendViewedEvents(requestState, data);

  return {
    productRecommendations: data,
    isLoading: requestState === RequestStates.pending,
    isLoaded: requestState === RequestStates.completed,
    hasFailed: requestState === RequestStates.failed 
  };
};

export default { useProductRecommendationsData, useShowRecommendationsFooter, useIsMobile, useActivateRecommendationsExperiment };
