/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { MailtoLink, Hyperlink } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import Banner from 'components/Banner';

import messages from './messages';

export const CertificateBanner = ({ courseNumber }) => {
  const certificate = appHooks.useCardCertificateData(courseNumber);
  const {
    isAudit,
    isVerified,
    hasFinished,
  } = appHooks.useCardEnrollmentData(courseNumber);
  const { isPassing } = appHooks.useCardGradeData(courseNumber);
  const { minPassingGrade, progressUrl } = appHooks.useCardCourseRunData(courseNumber);
  const { supportEmail, billingEmail } = appHooks.usePlatformSettingsData();
  const { formatMessage } = useIntl();

  const emailLink = address => address && <MailtoLink to={address}>{address}</MailtoLink>;

  if (certificate.isRestricted) {
    return (
      <Banner variant="danger">
        {formatMessage(messages.certRestricted, { supportEmail: emailLink(supportEmail) })}
        {isVerified && '  '}
        {isVerified && formatMessage(
          messages.certRefundContactBilling,
          { billingEmail: emailLink(billingEmail) },
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
    if (hasFinished) {
      return (
        <Banner variant="warning">
          {formatMessage(messages.notEligibleForCert)}.
          {'  '}
          <Hyperlink destination={progressUrl}>{formatMessage(messages.viewGrades)}</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="warning">
        {formatMessage(messages.certMinGrade, { minPassingGrade })}
      </Banner>
    );
  }
  if (certificate.isDownloadable) {
    if (certificate.certPreviewUrl) {
      return (
        <Banner variant="success" icon={CheckCircle}>
          {formatMessage(messages.certReady)}
          {'  '}
          <Hyperlink destination={certificate.certPreviewUrl}>
            {formatMessage(messages.viewCertificate)}
          </Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="success" icon={CheckCircle}>
        {formatMessage(messages.certReady)}
        {'  '}
        <Hyperlink destination={certificate.certDownloadUrl}>
          {formatMessage(messages.downloadCertificate)}
        </Hyperlink>
      </Banner>
    );
  }
  if (certificate.isEarnedButUnavailable) {
    return (
      <Banner>
        {formatMessage(
          messages.gradeAndCertReadyAfter,
          { availableDate: certificate.availableDate },
        )}
      </Banner>
    );
  }

  return null;
};
CertificateBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CertificateBanner;
