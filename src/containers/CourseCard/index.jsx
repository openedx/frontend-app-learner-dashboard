import React from 'react';
// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import shapes from 'data/services/lms/shapes';

import RelatedProgramsBadge from './components/RelatedProgramsBadge';
import CourseCardMenu from './components/CourseCardMenu';
import {
  CourseBanner,
  CertificateBanner,
  EntitlementBanner,
} from './components/Banners';
import CourseCardActions from './components/CourseCardActions';

export const CourseCard = ({ cardData }) => {
  const {
    course: {
      title,
      bannerUrl: imageUrl,
    },
    courseRun: {
      courseNumber,
      accessExpirationDate,
    },
  } = cardData;
  const providerName = cardData.provider?.name;
  return (
    <div className="mb-3">
      <Card orientation="horizontal">
        <Card.ImageCap
          src={imageUrl}
          srcAlt="course thumbnail"
        />
        <Card.Body>
          <Card.Header
            title={title}
            actions={<CourseCardMenu cardData={cardData} />}
          />
          <Card.Section>
            {providerName || 'Unkown'} • {courseNumber} • Access expires {accessExpirationDate}
          </Card.Section>
          <Card.Footer
            orientation="vertical"
            textElement={<RelatedProgramsBadge cardData={cardData} />}
          >
            <CourseCardActions cardData={cardData} />
          </Card.Footer>
        </Card.Body>
      </Card>
      <div className="course-card-banners">
        <CourseBanner cardData={cardData} />
        <CertificateBanner cardData={cardData} />
        <EntitlementBanner cardData={cardData} />
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

CourseCard.defaultProps = {};

export default CourseCard;
