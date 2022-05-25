import React from 'react';
import PropTypes from 'prop-types';
import { Locked } from '@edx/paragon/icons';
import { Button, Card } from '@edx/paragon';

import { courseData } from 'data/services/lms/fakeData/courses';

import RelatedProgram from './RelatedProgram';
import CourseCardMenu from './CourseCardMenu';
import CourseCardFooter from './CourseCardFooter';

export const CourseCard = ({ courseID }) => {
  const {
    title,
    imageUrl,
    displayNumber,
    displayOrg,
    accessExpiryDate,
  } = courseData[courseID] || {};
  return (
    <div>
      <Card orientation="horizontal">
        <Card.ImageCap
          src={imageUrl}
          srcAlt="course thumbnail"
          // logoSrc='https://via.placeholder.com/150'
          // logoAlt='Card logo'
        />
        <Card.Body>
          <Card.Header
            title={title}
            actions={<CourseCardMenu />}
          />
          <Card.Section>
            {displayOrg} • {displayNumber} • Access expires {accessExpiryDate}
          </Card.Section>
          <Card.Footer orientation="vertical" textElement={<RelatedProgram />}>
            <Button iconBefore={Locked} variant="outline-primary">
              Upgrade
            </Button>
            <Button>Resume</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      <CourseCardFooter />
    </div>
  );
};

CourseCard.propTypes = {
  courseID: PropTypes.string.isRequired,
};

CourseCard.defaultProps = {};

export default CourseCard;
