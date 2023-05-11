import React from 'react';
import { Container } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import ProductCardHeader from './ProductCardHeader';
import './index.scss';

const ProductRecommendationsContainer = () => {
  const { formatMessage } = useIntl();
  const mockRecommendations = ['executive-education', 'bootcamp-2u', 'course'];

  return (
    <div className="bg-light-200">
      <Container
        size="lg"
        className="recommendations-container border-dark-200 pt-sm-5 pt-4.5 pb-2 pb-sm-4.5"
      >
        <h2>{formatMessage(messages.recommendationsHeading)}</h2>
        {/* {mockRecommendations.forEach((recommendation) => (
          <ProductCardContainer />
        ))} */}
        {mockRecommendations.map((courseType) => (
           <ProductCardHeader courseType={courseType} />
        ))}
      </Container>
    </div>
  );
};

export default ProductRecommendationsContainer;
