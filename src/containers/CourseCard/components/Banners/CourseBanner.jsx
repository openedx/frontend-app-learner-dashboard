/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@edx/paragon';

import Banner from 'components/Banner';
import { useCourseBannerData } from './hooks';
import messages from './messages';

export const CourseBanner = ({ courseNumber }) => {
  const { courseData, formatMessage } = useCourseBannerData({ courseNumber });

  if (courseData.isVerified) { return null; }

  if (courseData.isAuditAccessExpired) {
    if (courseData.canUpgrade) {
      return (
        <Banner>
          {formatMessage(messages.auditAccessExpired)}
          {'  '}
          {formatMessage(messages.upgradeToAccess)}
        </Banner>
      );
    }
    return (
      <Banner>
        {formatMessage(messages.auditAccessExpired)}
        {'  '}
        <Hyperlink destination="">{formatMessage(messages.findAnotherCourse)}</Hyperlink>
      </Banner>
    );
  }
  if (courseData.isCourseRunActive && !courseData.canUpgrade) {
    return (
      <Banner>
        {formatMessage(messages.upgradeDeadlinePassed)}
        {'  '}
        <Hyperlink destination={courseData.courseWebsite || ''}>
          {formatMessage(messages.exploreCourseDetails)}
        </Hyperlink>
      </Banner>
    );
  }
  return null;
};
CourseBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseBanner;
