import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Icon, Hyperlink } from '@edx/paragon';
import { ChevronRight } from '@edx/paragon/icons';
import messages from '../messages';

const ProductCardHeader = ({ courseType }) => {
  const { formatMessage } = useIntl();

  const getProductTypeDetail = (type) => {
    switch (type) {
      case 'Executive Education':
        return {
          heading: messages.executiveEducationHeading,
          description: messages.executiveEducationDescription,
          url: '/executive-education?linked_from=recommender',
        };
      case 'Boot Camp':
        return {
          heading: messages.bootcampHeading,
          description: messages.bootcampDescription,
          url: '/boot-camps?linked_from=recommender',
        };
      default: {
        return {
          heading: messages.courseHeading,
          description: messages.courseDescription,
          url: '/search?tab=course?linked_from=recommender',
        };
      }
    }
  };

  const productTypeDetail = getProductTypeDetail(courseType);

  return (
    <div>
      <Hyperlink
        destination={`https://www.edx.org${productTypeDetail.url}`}
        className="base-card-link text-decoration-none"
      >
        <div className="d-flex align-items-center border-bottom">
          <h3 className="h3 mb-2 text-left">
            {formatMessage(productTypeDetail.heading)}
          </h3>
          <Icon src={ChevronRight} className="text-primary-500 ml-2.5" />
        </div>
      </Hyperlink>
      <p className="text-gray-500 x-small mt-2 mb-2">
        {formatMessage(productTypeDetail.description)}
      </p>
    </div>
  );
};

ProductCardHeader.propTypes = {
  courseType: PropTypes.string.isRequired,
};

export default ProductCardHeader;
