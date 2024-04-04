import React from 'react';
import { Spinner } from '@openedx/paragon';

import hooks from './hooks';

export const LoadingView = () => {
  const { spinnerScreenReaderText } = hooks.useDashboardMessages();

  return (
    <div className="course-list-loading">
      <Spinner
        animation="border"
        className="mie-3"
        screenReaderText={spinnerScreenReaderText}
      />
    </div>
  );
};

export default LoadingView;
