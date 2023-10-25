import React from 'react';
import PropTypes from 'prop-types';

import PaintedDoorExperimentProvider from 'widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';

export const AppWrapper = ({
  children,
}) => {
  console.log(`process.env.EXPERIMENT_08_23_VAN_PAINTED_DOOR = ${Boolean(process.env.EXPERIMENT_08_23_VAN_PAINTED_DOOR)}`);
  return (
    <PaintedDoorExperimentProvider>
      {children}
    </PaintedDoorExperimentProvider>
  );
};
AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AppWrapper;
