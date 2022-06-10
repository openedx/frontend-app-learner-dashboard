/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Hyperlink } from '@edx/paragon';

import { selectors } from 'data/redux';

import Banner from 'components/Banner';

const { cardData } = selectors;

export const CourseBanner = ({ courseNumber }) => {
  const cardValue = (sel) => useSelector(cardData.cardSelector(sel, courseNumber));
  const isVerified = cardValue(cardData.isVerified);
  if (isVerified) { return null; }

  const isCourseRunActive = cardValue(cardData.isCourseRunActive);
  const canUpgrade = cardValue(cardData.canUpgrade);
  const isAuditAccessExpired = cardValue(cardData.isAuditAccessExpired);
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
  if (isCourseRunActive && !canUpgrade) {
    const courseWebsite = cardValue(cardData.courseWebsite);
    return (
      <Banner>
        Your upgrade deadline for this course has passed.  To upgrade, enroll in a session that is farther in the future.
        {'  '}
        <Hyperlink href={courseWebsite}>Explore course details.</Hyperlink>
      </Banner>
    );
  }
  return null;
};
CourseBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseBanner;
