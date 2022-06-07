/* eslint-disable max-len */
import React from 'react';
import { Hyperlink } from '@edx/paragon';

import shapes from 'data/services/lms/shapes';

import Banner from 'components/Banner';

export const CourseBanner = ({ cardData }) => {
  const {
    // course,
    enrollment,
    courseRun,
  } = cardData;
  if (enrollment.isVerified) {
    return null;
  }
  const isActive = courseRun.isStarted && !courseRun.isFinished;
  const { canUpgrade, isAuditAccessExpired } = enrollment;
  if (isAuditAccessExpired) {
    if (canUpgrade) {
      return (
        <Banner>
          Your audit access to this course has expired.  Upgrade now to access your course again.
        </Banner>
      );
    }
    return (
      <Banner>
        Your audit access to this course has expired. <Hyperlink>Find another course</Hyperlink>
      </Banner>
    );
  }
  if (isActive && !canUpgrade) {
    return (
      <Banner>
        Your upgrade deadline for this course has passed.  To upgrade, enroll in a session that is farther in the future.
        {'  '}
        <Hyperlink href={cardData.course.website}>Explore course details.</Hyperlink>
      </Banner>
    );
  }
  return null;
};
CourseBanner.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

export default CourseBanner;
