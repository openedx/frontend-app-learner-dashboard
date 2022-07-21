/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { Hyperlink } from '@edx/paragon';
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
  const { minPassingGrade } = appHooks.useCardCourseRunData(courseNumber);
  const { formatMessage } = useIntl();

  if (certificate.isRestricted) {
    return (
      <Banner variant="danger">
        {formatMessage(messages.certRestricted)}
        <Hyperlink destination="info@example.com">info@example.com</Hyperlink>
        {isVerified && (
          <>
            If you would like a refund on your Certificate of Achievement, please contact our billing address <Hyperlink destination="billing@example.com">billing@example.com</Hyperlink>
          </>
        )}
      </Banner>
    );
  }
  if (!isPassing) {
    if (isAudit) {
      return (<Banner> Grade required to pass the course: {minPassingGrade}% </Banner>);
    }
    if (hasFinished) {
      return (
        <Banner variant="warning">
          You are not eligible for a certificate.  <Hyperlink destination="">View grades.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="warning">
        Grade required for a certificate: {minPassingGrade}%
      </Banner>
    );
  }
  if (certificate.isDownloadable) {
    if (certificate.previewUrl) {
      return (
        <Banner variant="success" icon={CheckCircle}>
          Congratulations.  Your certificate is ready.
          {'  '}
          <Hyperlink destination={certificate.previewUrl}>View Certificate.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="success" icon={CheckCircle}>
        Congratulations.  Your certificate is ready.
        {'  '}
        <Hyperlink destination={certificate.downloadUrl}>Download Certificate.</Hyperlink>
      </Banner>
    );
  }
  if (certificate.isEarnedButUnavailable) {
    return (
      <Banner>
        Your grade and certificate will be ready after {certificate.availableDate}.
      </Banner>
    );
  }

  return null;
};
CertificateBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CertificateBanner;
