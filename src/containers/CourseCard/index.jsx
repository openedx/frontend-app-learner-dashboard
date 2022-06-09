import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import { selectors } from 'data/redux';

import { getCardValue } from 'hooks';

import RelatedProgramsBadge from './components/RelatedProgramsBadge';
import CourseCardMenu from './components/CourseCardMenu';
import {
  CourseBanner,
  CertificateBanner,
  EntitlementBanner,
} from './components/Banners';
import CourseCardActions from './components/CourseCardActions';

const { cardData } = selectors;

export const CourseCard = ({ courseNumber }) => {
  const cardValue = getCardValue(courseNumber);
  const title = cardValue(cardData.courseTitle);
  const bannerUrl = cardValue(cardData.courseBannerUrl);
  const accessExpirationDate = cardValue(cardData.courseRunAccessExpirationDate);
  const providerName = cardValue(cardData.providerName);
  return (
    <div className="mb-3">
      <Card orientation="horizontal">
        <Card.ImageCap
          src={bannerUrl}
          srcAlt="course thumbnail"
        />
        <Card.Body>
          <Card.Header
            title={title}
            actions={<CourseCardMenu courseNumber={courseNumber} />}
          />
          <Card.Section>
            {providerName || 'Unkown'} • {courseNumber} • Access expires {accessExpirationDate}
          </Card.Section>
          <Card.Footer
            orientation="vertical"
            textElement={<RelatedProgramsBadge courseNumber={courseNumber} />}
          >
            <CourseCardActions courseNumber={courseNumber} />
          </Card.Footer>
        </Card.Body>
      </Card>
      <div className="course-card-banners">
        <CourseBanner courseNumber={courseNumber} />
        <CertificateBanner courseNumber={courseNumber} />
        <EntitlementBanner courseNumber={courseNumber} />
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

CourseCard.defaultProps = {};

export default CourseCard;
