import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Icon, Hyperlink } from '@edx/paragon';
import { ChevronRight } from '@edx/paragon/icons';
import messages from '../messages';

function ProductCardHeader({ courseType }) {
  const { formatMessage } = useIntl();

  const getProductTypeDetail = (type) => {
    switch (type) {
      case 'executive-education':
      case 'executive-education-2u':
        return {
          heading: messages.executiveEducationHeading,
          description: messages.executiveEducationDescription,
          url: '/executive-education',
        };
      case 'bootcamp-2u':
        return {
          heading: messages.bootcampHeading,
          description: messages.bootcampDescription,
          url: '/boot-camps',
        };
      default: {
        return {
          heading: messages.courseHeading,
          description: messages.courseDescription,
          url: '/search?tab=course',
        };
      }
    }
  };

  const productTypeDetail = getProductTypeDetail(courseType);

  return (
    <div>
      <Hyperlink
        destination={`https://www.edx.org${productTypeDetail.url}`}
        className="base-card-link"
      >
        <div className="d-flex align-items-center border-bottom">
          <h3 className={classNames('h3 mb-2 text-left')}>
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
}

ProductCardHeader.propTypes = {
  courseType: PropTypes.string.isRequired,
};

export default ProductCardHeader;
