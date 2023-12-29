import React from 'react';
import PropTypes from 'prop-types';

import { Card, Hyperlink, Truncate } from '@openedx/paragon';

import { useIsCollapsed } from 'containers/CourseCard/hooks';
import useCourseCardData from './hooks';
import './index.scss';

export const CourseCard = ({ course, isControl }) => {
  const isCollapsed = useIsCollapsed();
  const { handleCourseClick } = useCourseCardData(course, isControl);

  return (
    <Hyperlink
      destination={course?.marketingUrl}
      className="card-link"
      onClick={handleCourseClick}
    >
      <Card orientation={isCollapsed ? 'vertical' : 'horizontal'} className="p-3 mb-1 recommended-course-card">
        <div className={isCollapsed ? '' : 'd-flex align-items-center'}>
          <Card.ImageCap
            src={course.logoImageUrl}
            srcAlt={course.title}
          />
          <Card.Body className="d-flex align-items-center">
            <Card.Section className={isCollapsed ? 'pt-3' : 'pl-3'}>
              <h4 className="text-info-500">
                <Truncate lines={3}>
                  {course.title}
                </Truncate>
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
  isControl: PropTypes.oneOf([true, false, null]).isRequired,
};

export default CourseCard;
