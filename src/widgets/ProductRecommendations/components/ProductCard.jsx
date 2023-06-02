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
  <div className="base-card-wrapper">
    <Hyperlink destination={url}>
      <Card className="base-card light" variant="light">
        <Card.ImageCap
          src={headerImage}
          srcAlt={`header image for ${title}`}
          logoSrc={schoolLogo}
          logoAlt={`logo for ${subtitle}`}
        />
        <Card.Header
          className="mt-2"
          title={(
            <Truncate lines={3} ellipsis="…" className="product-card-title">
              {title}
            </Truncate>
          )}
          subtitle={(
            <Truncate lines={1} className="product-card-subtitle">
              {subtitle}
            </Truncate>
          )}
        />
        <Card.Section>
          <div className="product-badge">
            <Badge>{courseType}</Badge>
          </div>
        </Card.Section>
      </Card>
    </Hyperlink>
  </div>
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
