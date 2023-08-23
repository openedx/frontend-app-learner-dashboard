import React from 'react';
import PropTypes from 'prop-types';

import PaintedDoorExperimentProvider from 'widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';

export const AppWrapper = ({
  children,
}) => {
  if (process.env.EXPERIMENT_08_23_VAN_PAINTED_DOOR) {
    return (
      <PaintedDoorExperimentProvider>
        {children}
      </PaintedDoorExperimentProvider>
    );
  }
  return children;
};
AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AppWrapper;
