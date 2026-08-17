import React from 'react';
import { Button } from '@openedx/paragon';

import useIsCollapsed from './hooks';

export const ActionButton = (props) => {
  const isSmall = useIsCollapsed();
  return (
    <Button
      {...props}
      {...isSmall && { size: 'sm' }}
    />
  );
};

export default ActionButton;
