import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  Truncate,
  Hyperlink,
} from '@edx/paragon';

const ProductCard = ({
  title,
  subtitle,
  headerImage,
  schoolLogo,
  courseType,
  url,
}) => (
  <Card
    className="base-card d-flex text-decoration-none"
    as={Hyperlink}
    destination={url}
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

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  headerImage: PropTypes.string.isRequired,
  schoolLogo: PropTypes.string.isRequired,
  courseType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ProductCard;
