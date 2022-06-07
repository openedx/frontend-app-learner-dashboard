/* eslint-disable max-len */
import React from 'react';

import { Hyperlink } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';

import shapes from 'data/services/lms/shapes';

import Banner from 'components/Banner';

const restrictedMessage = 'Your Certificate of Achievement is being held pending confirmation that the issuance of your Certificate is in compliance with strict U.S. embargoes on Iran, Cuba, Syria, and Sudan.  If you think our system has mistakenly identified you as being connected with one of those countries, please let us know by contacting ';

export const CertificateBanner = ({ cardData }) => {
  const {
    certificates,
    courseRun,
    enrollment,
    grades,
  } = cardData;
  if (certificates.isRestricted) {
    if (enrollment.isAudit) {
      return (
        <Banner variant="danger">
          {restrictedMessage}<Hyperlink>info@example.com</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="danger">
        {restrictedMessage}<Hyperlink>info@example.com</Hyperlink>
        If you would like a refund on your Certificate of Achievement, please contact our billing address <Hyperlink>billing@example.com</Hyperlink>
      </Banner>
    );
  }
  if (!grades.isPassing) {
    if (enrollment.isAudit) {
      return (
        <Banner>
          Grade required to pass the course: {courseRun.minPassingGrade}%
        </Banner>
      );
    }
    if (courseRun.isFinished) {
      return (
        <Banner variant="warning">
          You are not eligible for a certificate.
          {'  '}
          <Hyperlink>View grades.</Hyperlink>
        </Banner>
      );
    }

    return (
      <Banner variant="warning">
        Grade required for a certificate: {courseRun.minPassingGrade}%
      </Banner>
    );
  }
  if (certificates.isDownloadable) {
    if (certificates.downloadUrls.preview) {
      return (
        <Banner variant="success" icon={CheckCircle}>
          Congratulations.  Your certificate is ready.
          {'  '}
          <Hyperlink>View Certificate.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="success" icon={CheckCircle}>
        Congratulations.  Your certificate is ready.
        {'  '}
        <Hyperlink>Download Certificate.</Hyperlink>
      </Banner>
    );
  }
  if (certificates.isEarned && !certificates.isAvailable) {
    return (
      <Banner>
        Your grade and certificate will be ready after {certificates.availableDate}.
      </Banner>
    );
  }

  return null;
};
CertificateBanner.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

export default CertificateBanner;
