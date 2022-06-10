import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import hooks from './hooks';

import RelatedProgramsBadge from './components/RelatedProgramsBadge';
import CourseCardMenu from './components/CourseCardMenu';
import {
  CourseBanner,
  CertificateBanner,
  EntitlementBanner,
} from './components/Banners';
import CourseCardActions from './components/CourseCardActions';
import messages from './messages';

export const CourseCard = ({ courseNumber }) => {
  const {
    title,
    bannerUrl,
    providerName,
    accessMessage,
    formatMessage,
  } = hooks({ courseNumber });
  return (
    <div className="mb-3">
      <Card orientation="horizontal">
        <Card.ImageCap
          src={bannerUrl}
          srcAlt={formatMessage(messages.bannerAlt)}
        />
        <Card.Body>
          <Card.Header
            title={title}
            actions={<CourseCardMenu courseNumber={courseNumber} />}
          />
          <Card.Section>
            {providerName} • {courseNumber} • {accessMessage}
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
