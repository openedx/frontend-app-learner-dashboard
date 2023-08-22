import React from 'react';
import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import messages from '../messages';

export const RecommendationsPanelButton = ({ handleClick }) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      as="a"
      variant="brand"
      onClick={handleClick}
    >
      {formatMessage(messages.seeAllRecommendationsButton)}
    </Button>
  );
};

RecommendationsPanelButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default RecommendationsPanelButton;
