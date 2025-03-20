/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { utilHooks, reduxHooks } from 'hooks';
import Banner from 'components/Banner';
import messages from './messages';

export const CourseBanner = ({ cardId }) => {
  const {
    isVerified,
    isAuditAccessExpired,
    coursewareAccess = {},
  } = reduxHooks.useCardEnrollmentData(cardId);
  const courseRun = reduxHooks.useCardCourseRunData(cardId);
  const { formatMessage } = useIntl();
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
