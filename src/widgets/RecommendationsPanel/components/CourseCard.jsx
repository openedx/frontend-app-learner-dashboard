import React from 'react';
import PropTypes from 'prop-types';

import { Card, Hyperlink, Truncate } from '@edx/paragon';

import { useIsCollapsed } from 'containers/CourseCard/hooks';
import { configuration } from '../../../config';
import { setCookie, getCookie } from '../../../utils/cookies';
import './index.scss';

export const CourseCard = ({ course, isPersonalizedRecommendation }) => {
  const isCollapsed = useIsCollapsed();

  const handleCourseClick = () => {
    const cookieName = configuration.PERSONALIZED_RECOMMENDATION_COOKIE_NAME;
    let recommendedCourses = getCookie(cookieName);
    if (typeof recommendedCourses === 'undefined') {
      recommendedCourses = { course_keys: [course.courseKey] };
    } else if (!recommendedCourses.course_keys.includes(course.courseKey)) {
      recommendedCourses.course_keys.push(course.courseKey);
    }
    recommendedCourses.is_personalized_recommendation = isPersonalizedRecommendation;
    setCookie(cookieName, JSON.stringify(recommendedCourses), 365);
  };

  return (
    <Hyperlink destination={course?.marketingUrl} className="card-link" onClick={handleCourseClick}>
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
  isPersonalizedRecommendation: PropTypes.bool.isRequired,
};

export default CourseCard;
