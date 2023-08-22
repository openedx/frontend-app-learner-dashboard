import React from 'react';
import PropTypes from 'prop-types';
import RecommendationsPaintedDoorBtn from 'widgets/RecommendationsPaintedDoorBtn';
import { COLLAPSED_NAVBAR, EXPANDED_NAVBAR } from 'widgets/RecommendationsPaintedDoorBtn/constants';
import {
  usePaintedDoorExperimentContext,
} from 'widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';

export const WidgetNavbar = ({ placement }) => {
  const {
    experimentVariation,
    isPaintedDoorNavbarBtnVariation,
    experimentLoading,
  } = usePaintedDoorExperimentContext();

  if (!experimentLoading && isPaintedDoorNavbarBtnVariation) {
    return (
      <RecommendationsPaintedDoorBtn placement={placement} experimentVariation={experimentVariation} />
    );
  }

  return null;
};

WidgetNavbar.propTypes = {
  placement: PropTypes.oneOf([COLLAPSED_NAVBAR, EXPANDED_NAVBAR]).isRequired,
};

export default WidgetNavbar;
