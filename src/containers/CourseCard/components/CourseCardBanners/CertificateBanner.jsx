/* eslint-disable max-len */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { MailtoLink, Hyperlink } from '@openedx/paragon';
import { CheckCircle } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { baseAppUrl } from 'data/services/lms/urls';

import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import { utilHooks, useCourseData } from 'hooks';
import Banner from 'components/Banner';

import messages from './messages';

const { useFormatDate } = utilHooks;

export const CertificateBanner = ({ cardId }) => {
  const { data: learnerHomeData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const {
    certificate = {},
    isVerified = false,
    isAudit = false,
    isPassing = false,
    isArchived = false,
    minPassingGrade = 0,
    progressUrl = '',
  } = useMemo(() => ({
    isVerified: courseData?.enrollment?.isVerified,
    isAudit: courseData?.enrollment?.isAudit,
    certificate: courseData?.certificate || {},
    isPassing: courseData?.gradeData?.isPassing,
    isArchived: courseData?.courseRun?.isArchived,
    minPassingGrade: Math.floor(courseData?.courseRun?.minPassingGrade || 0 * 100),
    progressUrl: baseAppUrl(courseData?.courseRun?.progressUrl || ''),
  }), [courseData]);
  const { supportEmail, billingEmail } = useMemo(
    () => ({
      supportEmail: learnerHomeData?.platformSettings?.supportEmail,
      billingEmail: learnerHomeData?.platformSettings?.billingEmail,
    }),
    [learnerHomeData],
  );
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

  const emailLink = address => <MailtoLink to={address}>{address}</MailtoLink>;

  if (certificate.isRestricted) {
    return (
      <Banner variant="danger">
        { supportEmail ? formatMessage(messages.certRestricted, { supportEmail: emailLink(supportEmail) }) : formatMessage(messages.certRestrictedNoEmail)}
        {isVerified && '  '}
        {isVerified && (billingEmail ? formatMessage(messages.certRefundContactBilling, { billingEmail: emailLink(billingEmail) }) : formatMessage(messages.certRefundContactBillingNoEmail))}
      </Banner>
    );
  }
  if (certificate.isDownloadable) {
    return (
      <Banner variant="success" icon={CheckCircle}>
        {formatMessage(messages.certReady)}
        {certificate.certPreviewUrl && (
          <>
            {'  '}
            <Hyperlink isInline destination={certificate.certPreviewUrl}>
              {formatMessage(messages.viewCertificate)}
            </Hyperlink>
          </>
        )}
      </Banner>
    );
  }
  if (!isPassing) {
    if (isAudit) {
      return (
        <Banner>
          {formatMessage(messages.passingGrade, { minPassingGrade })}
        </Banner>
      );
    }
    if (isArchived) {
      return (
        <Banner variant="warning">
          {formatMessage(messages.notEligibleForCert)}
          {'  '}
          <Hyperlink isInline destination={progressUrl}>{formatMessage(messages.viewGrades)}</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="warning">
        {formatMessage(messages.certMinGrade, { minPassingGrade })}
      </Banner>
    );
  }
  if (certificate.isEarned && new Date(certificate.availableDate) > new Date()) {
    return (
      <Banner>
        {formatMessage(
          messages.gradeAndCertReadyAfter,
          { availableDate: formatDate(certificate.availableDate) },
        )}
      </Banner>
    );
  }

  return null;
};
CertificateBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CertificateBanner;
