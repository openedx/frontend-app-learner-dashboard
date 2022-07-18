/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@edx/paragon';

import { useCardValues } from 'hooks';
import { selectors } from 'data/redux';

import Banner from 'components/Banner';

const { cardData } = selectors;

export const CourseBanner = ({ courseNumber }) => {
  const courseData = useCardValues(courseNumber, {
    isVerified: cardData.isVerified,
    isCourseRunActive: cardData.isCourseRunActive,
    canUpgrade: cardData.canUpgrade,
    isAuditAccessExpired: cardData.isAuditAccessExpired,
    courseWebsite: cardData.courseWebsite,
  });

  if (courseData.isVerified) { return null; }

  if (courseData.isAuditAccessExpired) {
    if (courseData.canUpgrade) {
      return (
        <Banner>
          Your audit access to this course has expired.  Upgrade now to access your course again.
        </Banner>
      );
    }
    return (
      <Banner>
        Your audit access to this course has expired. <Hyperlink destination="">Find another course</Hyperlink>
      </Banner>
    );
  }
  if (courseData.isCourseRunActive && !courseData.canUpgrade) {
    return (
      <Banner>
        Your upgrade deadline for this course has passed.  To upgrade, enroll in a session that is farther in the future.
        {'  '}
        <Hyperlink destination={courseData.courseWebsite || ''}>Explore course details.</Hyperlink>
      </Banner>
    );
  }
  return null;
};
CourseBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseBanner;
