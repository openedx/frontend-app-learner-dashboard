/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { Hyperlink } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';

import { selectors } from 'data/redux';
import Banner from 'components/Banner';
import { getCardValue, getCardValues } from 'hooks';

const { cardData } = selectors;

const restrictedMessage = 'Your Certificate of Achievement is being held pending confirmation that the issuance of your Certificate is in compliance with strict U.S. embargoes on Iran, Cuba, Syria, and Sudan.  If you think our system has mistakenly identified you as being connected with one of those countries, please let us know by contacting ';

export const CertificateBanner = ({ courseNumber }) => {
  const cardValue = getCardValue(courseNumber);

  const { isRestricted, isAudit, isVerified } = getCardValues(courseNumber, {
    isRestricted: cardData.isRestricted,
    isAudit: cardData.isAudit,
    isVerified: cardData.isVerified,
  });
  if (isRestricted) {
    return (
      <Banner variant="danger">
        {restrictedMessage}<Hyperlink>info@example.com</Hyperlink>
        {isVerified && (
          <>
            If you would like a refund on your Certificate of Achievement, please contact our billing address <Hyperlink>billing@example.com</Hyperlink>
          </>
        )}
      </Banner>
    );
  }
  const {
    isPassing,
    minPassingGrade,
    isCourseRunFinished,
    isCertDownloadable,
    isCertEarnedButUnavailable,
    certAvailableDate,
  } = getCardValues(courseNumber, {
    isPassing: cardData.isPassing,
    minPassingGrade: cardData.minPassingGrade,
    isCourseRunFinished: cardData.isCourseRunFinished,
    isCertDownloadable: cardData.isCertDownloadable,
    isCertEarnedButUnavailable: cardData.isCertEarnedButUnavailable,
    certAvailableDate: cardData.certAvailableDate,
  });
  if (!isPassing) {
    if (isAudit) {
      return (<Banner> Grade required to pass the course: {minPassingGrade}% </Banner>);
    }
    if (isCourseRunFinished) {
      return (
        <Banner variant="warning">
          You are not eligible for a certificate.  <Hyperlink>View grades.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="warning">
        Grade required for a certificate: {minPassingGrade}%
      </Banner>
    );
  }
  if (isCertDownloadable) {
    const certDownloadUrl = cardValue(cardData.certDownloadUrl);
    const certPreviewUrl = cardValue(cardData.certPreviewUrl);
    if (certPreviewUrl) {
      return (
        <Banner variant="success" icon={CheckCircle}>
          Congratulations.  Your certificate is ready.
          {'  '}
          <Hyperlink href={certPreviewUrl}>View Certificate.</Hyperlink>
        </Banner>
      );
    }
    return (
      <Banner variant="success" icon={CheckCircle}>
        Congratulations.  Your certificate is ready.
        {'  '}
        <Hyperlink href={certDownloadUrl}>Download Certificate.</Hyperlink>
      </Banner>
    );
  }
  if (isCertEarnedButUnavailable) {
    return (
      <Banner>
        Your grade and certificate will be ready after {certAvailableDate}.
      </Banner>
    );
  }

  return null;
};
CertificateBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CertificateBanner;
