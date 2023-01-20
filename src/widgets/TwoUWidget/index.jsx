import React from 'react';

import './index.scss';
import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import { useTwoUWidgetData, useOptimizelyExperiment } from './hooks';

export const TwoUWidget = () => {
  const { show2ULobs } = useOptimizelyExperiment(); // TODO [VAN-1225] this will be removed after experiment.
  const { isLoading, isLoaded, countryCode } = useTwoUWidgetData();

  if (isLoading) {
    return <LoadingView />;
  }
  if (isLoaded && show2ULobs) {
    return <LoadedView countryCode={countryCode} show2ULobs={show2ULobs} />;
  }
  return '';
};

export default TwoUWidget;
