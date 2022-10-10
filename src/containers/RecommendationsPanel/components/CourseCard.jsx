import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Hyperlink } from '@edx/paragon';

import messages from './messages';

export const CourseCard = ({ course }) => {
  const { formatMessage } = useIntl();
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const courseTitle = course.title.length > 55 ? `${course.title.substring(0, 55)}...` : course.title;

  return (
    <Hyperlink destination={course?.marketingUrl}>
      <Card orientation={isMobile ? 'vertical' : 'horizontal'} className="p-3 mb-3 recommended-course-card">
        <div className={isMobile ? '' : 'd-flex'}>
          <Card.ImageCap
            src={course.logoImageUrl}
            srcAlt={course.title}
          />
          <Card.Body className="d-flex align-items-center">
            <Card.Section className={isMobile ? 'pt-3' : 'pl-3'}>
              <h4 className="text-info-500">
                {formatMessage(messages.courseTitle, { courseTitle })}
              </h4>
            </Card.Section>
          </Card.Body>
        </div>
      </Card>
    </Hyperlink>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    courseKey: PropTypes.string,
    title: PropTypes.string,
    logoImageUrl: PropTypes.string,
    marketingUrl: PropTypes.string,
  }).isRequired,
};

export default CourseCard;
