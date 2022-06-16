/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { Hyperlink } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';

import { selectors } from 'data/redux';
import Banner from 'components/Banner';
import { useCardValues } from 'hooks';

const { cardData } = selectors;

const restrictedMessage = 'Your Certificate of Achievement is being held pending confirmation that the issuance of your Certificate is in compliance with strict U.S. embargoes on Iran, Cuba, Syria, and Sudan.  If you think our system has mistakenly identified you as being connected with one of those countries, please let us know by contacting ';

export const CertificateBanner = ({ courseNumber }) => {
  const data = useCardValues(courseNumber, {
    certAvailableDate: cardData.certAvailableDate,
    certDownloadUrl: cardData.certDownloadUrl,
    certPreviewUrl: cardData.certPreviewUrl,
    isAudit: cardData.isAudit,
    isCertDownloadable: cardData.isCertDownloadable,
    isCertEarnedButUnavailable: cardData.isCertEarnedButUnavailable,
    isCourseRunFinished: cardData.isCourseRunFinished,
    isPassing: cardData.isPassing,
    isRestricted: cardData.isRestricted,
    isVerified: cardData.isVerified,
    minPassingGrade: cardData.minPassingGrade,
  });
  if (data.isRestricted) {
    return (
      <Banner variant="danger">
        {restrictedMessage}<Hyperlink>info@example.com</Hyperlink>
        {data.isVerified && (
          <>
            If you would like a refund on your Certificate of Achievement, please contact our billing address <Hyperlink>billing@example.com</Hyperlink>
          </>
        )}
      </Banner>
    );
  }
  if (!data.isPassing) {
    if (data.isAudit) {
      return (<Banner> Grade required to pass the course: {data.minPassingGrade}% </Banner>);
    }
    if (data.isCourseRunFinished) {
      return (
        <Banner variant="warning">
          You are not eligible for a certificate.  <Hyperlink>View grades.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="warning">
        Grade required for a certificate: {data.minPassingGrade}%
      </Banner>
    );
  }
  if (data.isCertDownloadable) {
    if (data.certPreviewUrl) {
      return (
        <Banner variant="success" icon={CheckCircle}>
          Congratulations.  Your certificate is ready.
          {'  '}
          <Hyperlink href={data.certPreviewUrl}>View Certificate.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="success" icon={CheckCircle}>
        Congratulations.  Your certificate is ready.
        {'  '}
        <Hyperlink href={data.certDownloadUrl}>Download Certificate.</Hyperlink>
      </Banner>
    );
  }
  if (data.isCertEarnedButUnavailable) {
    return (
      <Banner>
        Your grade and certificate will be ready after {data.certAvailableDate}.
      </Banner>
    );
  }

  return null;
};
CertificateBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CertificateBanner;
