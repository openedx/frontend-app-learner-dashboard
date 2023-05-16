import React from 'react';
import { Container } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import './index.scss';
import messages from '../messages';
import useFetchCrossProductCourses from '../hooks';
import ProductCardContainer from './ProductCardContainer';
import mockCrossProductRecommendations from '../mockData';

const ProductRecommendationsContainer = () => {
  const { formatMessage } = useIntl();
  const mockRecommendations = mockCrossProductRecommendations.courses;
  const { productRecommendations, isProductRecommendationsLoading } = useFetchCrossProductCourses();

  return (
    <div className="bg-light-200">
      {!isProductRecommendationsLoading && (
        <Container
          size="lg"
          className="recommendations-container pt-sm-5 pt-4.5 pb-2 pb-sm-4.5"
        >
          <h2 className="mb-4">
            {formatMessage(messages.recommendationsHeading)}
          </h2>
          <ProductCardContainer courses={productRecommendations} />
        </Container>
      )}
    </div>
  );
};

export default ProductRecommendationsContainer;
