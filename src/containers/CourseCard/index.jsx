import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import useCardData from './hooks';

import RelatedProgramsBadge from './components/RelatedProgramsBadge';
import CourseCardMenu from './components/CourseCardMenu';
import {
  CourseBanner,
  CertificateBanner,
  EntitlementBanner,
} from './components/Banners';
import CourseCardActions from './components/CourseCardActions';
import messages from './messages';
import CourseCardDetails from './components/CourseCardDetails';

export const CourseCard = ({ courseNumber }) => {
  const {
    title,
    bannerUrl,
    formatMessage,
  } = useCardData({ courseNumber });
  return (
    <div className="mb-3 course-card" data-testid="CourseCard">
      <Card orientation="horizontal">
        <Card.ImageCap
          src={bannerUrl}
          srcAlt={formatMessage(messages.bannerAlt)}
        />
        <Card.Body>
          <Card.Header
            title={<span data-testid="CourseCardTitle">{title}</span>}
            actions={<CourseCardMenu courseNumber={courseNumber} />}
          />
          <Card.Section>
            <CourseCardDetails courseNumber={courseNumber} />
          </Card.Section>
          <Card.Footer
            orientation="vertical"
            textElement={<RelatedProgramsBadge courseNumber={courseNumber} />}
          >
            <CourseCardActions courseNumber={courseNumber} />
          </Card.Footer>
        </Card.Body>
      </Card>
      <div className="course-card-banners" data-testid="CourseCardBanners">
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
