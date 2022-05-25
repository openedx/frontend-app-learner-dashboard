import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Program, Locked, MoreVert } from '@edx/paragon/icons';
import { Button, Card } from '@edx/paragon';
import { RelatedProgram } from './RelatedProgram';
import { CourseCardMenu } from './CourseCardMenu';
import { CourseCardFooter } from './CourseCardFooter';
import { courseData } from 'data/services/lms/fakeData/courses';


function CourseCard({ courseID }) {
  const {
    title,
    imageUrl,
    displayNumber,
    displayOrg,
    accessExpiryDate,
  } = courseData[courseID] || {};
  console.log(courseID);
  return (
    <div>
      <Card orientation='horizontal'>
        <Card.ImageCap
          src={imageUrl}
          srcAlt='course thumbnail'
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
          <Card.Footer orientation='vertical' textElement={<RelatedProgram />}>
            <Button iconBefore={Locked} variant='outline-primary'>
              Upgrade
            </Button>
            <Button>Resume</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      <CourseCardFooter />
    </div>
  );
}

CourseCard.propTypes = {
  // intl: intlShape.isRequired,
};

CourseCard.defaultProps = {};

export default CourseCard;

// export default injectIntl(CourseCard);
