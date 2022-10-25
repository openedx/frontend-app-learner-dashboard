/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { MailtoLink, Hyperlink } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useFormatDate } from 'utils/hooks';
import { hooks as appHooks } from 'data/redux';
import Banner from 'components/Banner';

import messages from './messages';

export const CertificateBanner = ({ cardId }) => {
  const certificate = appHooks.useCardCertificateData(cardId);
  const {
    isAudit,
    isVerified,
  } = appHooks.useCardEnrollmentData(cardId);
  const { isPassing } = appHooks.useCardGradeData(cardId);
  const { isArchived } = appHooks.useCardCourseRunData(cardId);
  const { minPassingGrade, progressUrl } = appHooks.useCardCourseRunData(cardId);
  const { supportEmail, billingEmail } = appHooks.usePlatformSettingsData();
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

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
    if (isArchived) {
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
  if (certificate.isEarnedButUnavailable) {
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
