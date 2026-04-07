/* eslint-disable max-len */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { utilHooks, useCourseData } from 'hooks';
import Banner from 'components/Banner';
import messages from './messages';

export const CourseBanner = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);
  const {
    isVerified = false,
    isAuditAccessExpired = false,
    coursewareAccess = {},
  } = useMemo(() => ({
    isVerified: courseData.enrollment?.isVerified,
    isAuditAccessExpired: courseData.enrollment?.isAuditAccessExpired,
    coursewareAccess: courseData.enrollment?.coursewareAccess || {},
  }), [courseData]);
  const courseRun = courseData?.courseRun || {};
  const formatDate = utilHooks.useFormatDate();

  const { hasUnmetPrerequisites, isStaff, isTooEarly } = coursewareAccess;

  if (isVerified) { return null; }

  return (
    <>
      {isAuditAccessExpired
        && (
          <Banner>
            {formatMessage(messages.auditAccessExpired)}
            {'  '}
            <Hyperlink isInline destination="">
              {formatMessage(messages.findAnotherCourse)}
            </Hyperlink>
          </Banner>
        )}

      {(!isStaff && isTooEarly && courseRun.startDate) && (
        <Banner>
          {formatMessage(messages.courseHasNotStarted, {
            startDate: formatDate(courseRun.startDate),
          })}
        </Banner>
      )}

      {(!isStaff && hasUnmetPrerequisites) && (
        <Banner>{formatMessage(messages.prerequisitesNotMet)}</Banner>
      )}
    </>
  );
};
CourseBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseBanner;
