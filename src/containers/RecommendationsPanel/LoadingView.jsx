import React from 'react';
import { Spinner } from '@edx/paragon';

import hooks from 'containers/Dashboard/hooks';

export const LoadingView = () => {
  const { spinnerScreenReaderText } = hooks.useDashboardMessages();

  return (
    <div className="recommendations-loading">
      <Spinner
        animation="border"
        variant="light"
        screenReaderText={spinnerScreenReaderText}
      />
    </div>
  );
};

export default LoadingView;
