import React from 'react';
import PropTypes from 'prop-types';

import { Card, Hyperlink } from '@edx/paragon';

import useIsCollapsed from './hooks';
import './index.scss';

export const CourseCard = ({
  course,
}) => {
  const courseTitle = course.title.length > 55 ? `${course.title.substring(0, 55)}...` : course.title;
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';

  return (
    <Hyperlink destination={course?.marketingUrl} className="card-link">
      <Card orientation={orientation} className="p-3 mb-1 recommended-course-card">
        <div className={isCollapsed ? '' : 'd-flex align-items-center'}>
          <Card.ImageCap
            src={course.logoImageUrl}
            srcAlt={course.title}
          />
          <Card.Body className="d-flex align-items-center">
            <Card.Section className={isCollapsed ? 'pt-3' : 'pl-3'}>
              <h4 className="text-info-500">
                {courseTitle}
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
