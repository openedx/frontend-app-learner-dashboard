import React from 'react';
import { Spinner } from '@openedx/paragon';

import { useDashboardMessages } from 'containers/Dashboard/hooks';

export const LoadingView = () => {
  const { spinnerScreenReaderText } = useDashboardMessages();
  return (
    <div className="recommendations-loading w-100">
      <Spinner
        animation="border"
        variant="light"
        screenReaderText={spinnerScreenReaderText}
      />
    </div>
  );
};

export default LoadingView;
