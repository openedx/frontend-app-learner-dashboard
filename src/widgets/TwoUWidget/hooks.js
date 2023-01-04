import { useState, useEffect } from 'react';

import { breakpoints, useWindowSize } from '@edx/paragon';

import { StrictDict } from 'utils';
import { RequestStates } from 'data/constants/requests';
import { hooks as appHooks } from 'data/redux';

import { activateExperiment, isUserInVariation } from './experiment';
import * as module from './hooks';
import api from './api';

export const state = StrictDict({
  requestState: (val) => useState(val), // eslint-disable-line
  data: (val) => useState(val), // eslint-disable-line
});

const useIsMediumScreen = () => {
  const { width } = useWindowSize();
  return width >= breakpoints.medium.minWidth && width < breakpoints.medium.maxWidth;
};

const useOptimizelyExperiment = () => {
  const [show2ULobs, setShow2ULobs] = useState(false);
  const [isExperimentLoaded, setIsExperimentLoaded] = useState(false);

  const enterpriseData = appHooks.useEnterpriseDashboardData();
  const isEnterpriseUser = !!enterpriseData;

  useEffect(() => {
    activateExperiment(isEnterpriseUser);
    const timer = setTimeout(() => {
      const inVariation = isUserInVariation();
      setShow2ULobs(inVariation);
      setIsExperimentLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isEnterpriseUser]);

  return { show2ULobs, isExperimentLoaded };
};

export const useFetchTwoUWidgetContext = (setRequestState, setData) => {
  useEffect(() => {
    let isMounted = true;
    api.fetchTwoUWidgetContext().then((response) => {
      if (isMounted) {
        setRequestState(RequestStates.completed);
        setData(response.data);
      }
    }).catch(() => {
      if (isMounted) {
        setRequestState(RequestStates.failed);
      }
    });
    return () => { isMounted = false; };
    /* eslint-disable */
  }, []);
};

const useTwoUWidgetData = () => {
  const [requestState, setRequestState] = module.state.requestState(RequestStates.pending);
  const [data, setData] = module.state.data({});
  module.useFetchTwoUWidgetContext(setRequestState, setData);

  return {
    countryCode: data?.countryCode || "",
    isLoaded: requestState === RequestStates.completed,
    isFailed: requestState === RequestStates.failed,
    isLoading: requestState === RequestStates.pending,
  };
};

export { useIsMediumScreen, useOptimizelyExperiment, useTwoUWidgetData };
