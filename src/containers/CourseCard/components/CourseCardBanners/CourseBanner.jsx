/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import Banner from 'components/Banner';
import messages from './messages';

export const CourseBanner = ({ cardId }) => {
  const {
    isVerified,
    isAuditAccessExpired,
    canUpgrade,
    coursewareAccess = {},
  } = appHooks.useCardEnrollmentData(cardId);
  const courseRun = appHooks.useCardCourseRunData(cardId);
  const course = appHooks.useCardCourseData(cardId);
  const { formatMessage } = useIntl();

  const {
    hasUnmetPrerequisites,
    isStaff,
    isTooEarly,
  } = coursewareAccess;

  const bannerStackComponents = [];

  if (isVerified) { return null; }

  if (isAuditAccessExpired) {
    if (canUpgrade) {
      bannerStackComponents.push(
        <Banner>
          {formatMessage(messages.auditAccessExpired)}
          {'  '}
          {formatMessage(messages.upgradeToAccess)}
        </Banner>,
      );
    }
    bannerStackComponents.push(
      <Banner>
        {formatMessage(messages.auditAccessExpired)}
        {'  '}
        <Hyperlink destination="">{formatMessage(messages.findAnotherCourse)}</Hyperlink>
      </Banner>,
    );
  }
  if (courseRun.isActive && !canUpgrade) {
    bannerStackComponents.push(
      <Banner>
        {formatMessage(messages.upgradeDeadlinePassed)}
        {'  '}
        <Hyperlink destination={course.website || ''}>
          {formatMessage(messages.exploreCourseDetails)}
        </Hyperlink>
      </Banner>,
    );
  }
  if (isTooEarly) {
    bannerStackComponents.push(
      <Banner>
        {formatMessage(messages.courseHasNotStarted, { startDate: courseRun.startDate })}
      </Banner>,
    );
  }
  if (hasUnmetPrerequisites) {
    bannerStackComponents.push(
      <Banner>
        {formatMessage(messages.prerequisitesNotMet)}
      </Banner>,
    );
  }
  if (isStaff) {
    bannerStackComponents.push(
      <Banner>
        {formatMessage(messages.staffAccessOnly)}
      </Banner>,
    );
  }
  return <>{bannerStackComponents}</>;
};
CourseBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseBanner;
