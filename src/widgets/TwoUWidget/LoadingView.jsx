import React from 'react';
import { Skeleton } from '@edx/paragon';

export const LoadingView = () => (
  <div className="loading-callouts-container">
    <h2 className="skeleton-title-width"><Skeleton /></h2>
    <p><Skeleton /></p>
  </div>
);

export default LoadingView;
