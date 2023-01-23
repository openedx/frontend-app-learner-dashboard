import React from 'react';

import './index.scss';
import { countryCodeUS } from './constants';
import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import { useTwoUWidgetData, useOptimizelyExperiment } from './hooks';
import track from './track';

export const TwoUWidget = () => {
  // TODO [VAN-1225] this will be removed after experiment.
  const { show2ULobs, isExperimentLoaded } = useOptimizelyExperiment();
  const { isLoading, isLoaded, countryCode } = useTwoUWidgetData();

  if (isExperimentLoaded && isLoaded && countryCode) {
    track.twoUWidgetExperimentViewed(show2ULobs, countryCode === countryCodeUS);
  }
  if (isLoading) {
    return <LoadingView />;
  }
  if (isLoaded && show2ULobs) {
    return <LoadedView countryCode={countryCode} show2ULobs={show2ULobs} />;
  }
  return '';
};

export default TwoUWidget;
