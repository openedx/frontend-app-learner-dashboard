import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  Truncate,
  Hyperlink,
} from '@edx/paragon';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import { trackProductCardClicked, trackCourseCardClicked } from '../optimizelyExperiment';
import { productCardClicked, discoveryCardClicked } from '../track';
import { bootCamp, executiveEducation } from '../constants';

const ProductCard = ({
  title,
  subtitle,
  headerImage,
  courseRunKey,
  schoolLogo,
  courseType,
  url,
}) => {
  const handleClick = (type, link) => {
    const crossProductTypes = [executiveEducation, bootCamp];
    const userId = getAuthenticatedUser().userId.toString();

    if (crossProductTypes.includes(type)) {
      trackProductCardClicked(userId);
      productCardClicked(courseRunKey, title, type, link);
    } else {
      trackCourseCardClicked(userId);
      discoveryCardClicked(courseRunKey, title, link);
    }
  };

  const getRedirectUrl = (link) => {
    const urlObj = new URL(link);
    const hasQueryStringParameters = urlObj.search !== '';

    if (hasQueryStringParameters) {
      return `${link}&linked_from=recommender`;
    }

    return `${link}?linked_from=recommender`;
  };

  const redirectUrl = getRedirectUrl(url);

  return (
    <Card
      className="base-card d-flex text-decoration-none"
      as={Hyperlink}
      destination={redirectUrl}
      onClick={() => {
        handleClick(courseType, redirectUrl);
      }}
      isClickable
    >
      <Card.ImageCap
        src={headerImage}
        srcAlt={`header image for ${title}`}
        logoSrc={schoolLogo}
        logoAlt={`logo for ${subtitle}`}
      />
      <Card.Header
        className="mt-2"
        title={(
          <Truncate lines={3} ellipsis="…" className="product-card-title font-weight-bold">
            {title}
          </Truncate>
        )}
        subtitle={(
          <Truncate lines={1} className="product-card-subtitle font-weight-normal">
            {subtitle}
          </Truncate>
      )}
      />
      <Card.Section>
        <div className="product-badge position-absolute">
          <Badge className="bg-light-500 text-dark-500">{courseType}</Badge>
        </div>
      </Card.Section>
    </Card>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  headerImage: PropTypes.string.isRequired,
  courseRunKey: PropTypes.string.isRequired,
  schoolLogo: PropTypes.string.isRequired,
  courseType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ProductCard;
