/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useCardValues } from 'hooks';
import { selectors } from 'data/redux';
import Banner from 'components/Banner';
import messages from './messages';

const { cardData } = selectors;

export const CourseBanner = ({ courseNumber }) => {
  const courseData = useCardValues(courseNumber, {
    isVerified: cardData.isVerified,
    isCourseRunActive: cardData.isCourseRunActive,
    canUpgrade: cardData.canUpgrade,
    isAuditAccessExpired: cardData.isAuditAccessExpired,
    courseWebsite: cardData.courseWebsite,
  });
  const { formatMessage } = useIntl();

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
