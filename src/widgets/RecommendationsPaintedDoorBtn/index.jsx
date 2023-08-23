import React from 'react';
import PropTypes from 'prop-types';
import NavbarButton from './components/NavbarButton';
import PaintedDoorModal from './components/PaintedDoorModal';
import { usePaintedDoorModal } from './components/PaintedDoorModal/hooks';
import { COLLAPSED_NAVBAR, EXPANDED_NAVBAR, RECOMMENDATIONS_PANEL } from './constants';
import RecommendationsPanelButton from './components/RecommendationsPanelButton';
import { trackPaintedDoorRecommendationHomeBtnClicked } from './track';

export const RecommendationsPaintedDoorBtn = ({ placement, experimentVariation }) => {
  const { isModalOpen, toggleModal } = usePaintedDoorModal();

  const handleClick = () => {
    toggleModal();
    trackPaintedDoorRecommendationHomeBtnClicked(experimentVariation);
  };

  const getPaintedDoorButton = () => {
    if ([COLLAPSED_NAVBAR, EXPANDED_NAVBAR].includes(placement)) {
      return (
        <NavbarButton handleClick={handleClick} placement={placement} />
      );
    } if (placement === RECOMMENDATIONS_PANEL) {
      return (
        <RecommendationsPanelButton handleClick={handleClick} />
      );
    }
    return null;
  };

  return (
    <>
      {getPaintedDoorButton()}
      <PaintedDoorModal isOpen={isModalOpen} onClose={toggleModal} variation={experimentVariation} />
    </>
  );
};

RecommendationsPaintedDoorBtn.propTypes = {
  placement: PropTypes.oneOf([COLLAPSED_NAVBAR, EXPANDED_NAVBAR, RECOMMENDATIONS_PANEL]).isRequired,
  experimentVariation: PropTypes.string.isRequired,
};

export default RecommendationsPaintedDoorBtn;
