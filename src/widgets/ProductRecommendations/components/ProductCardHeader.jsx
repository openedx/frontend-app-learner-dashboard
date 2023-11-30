import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import { Icon, Hyperlink } from '@edx/paragon';
import { ChevronRight } from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { trackProductHeaderClicked } from '../optimizelyExperiment';
import { recommendationsHeaderClicked } from '../track';
import { executiveEducation, bootCamp } from '../constants';
import messages from '../messages';

const ProductCardHeader = ({ courseType }) => {
  const getProductTypeDetail = (type) => {
    switch (type) {
      case executiveEducation:
        return {
          heading: messages.executiveEducationHeading,
          description: messages.executiveEducationDescription,
          url: '/executive-education?linked_from=recommender',
        };
      case bootCamp:
        return {
          heading: messages.bootcampHeading,
          description: messages.bootcampDescription,
          url: '/boot-camps?linked_from=recommender',
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

  const handleClick = (type, url) => {
    const userId = getAuthenticatedUser().userId.toString();

    trackProductHeaderClicked(userId);
    recommendationsHeaderClicked(type, url);
  };

  const { formatMessage } = useIntl();
  const productTypeDetail = getProductTypeDetail(courseType);
  const headerUrl = `${getConfig().MARKETING_SITE_BASE_URL}${productTypeDetail.url}`;

  return (
    <div>
      <Hyperlink
        destination={headerUrl}
        className="base-card-link text-decoration-none"
        onClick={() => {
          handleClick(courseType, headerUrl);
        }}
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
