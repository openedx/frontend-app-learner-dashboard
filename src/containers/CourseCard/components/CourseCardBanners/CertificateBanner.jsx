/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { MailtoLink, Hyperlink } from '@openedx/paragon';
import { CheckCircle } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { utilHooks, reduxHooks } from 'hooks';
import Banner from 'components/Banner';

import messages from './messages';

const { useFormatDate } = utilHooks;

export const CertificateBanner = ({ cardId }) => {
  const certificate = reduxHooks.useCardCertificateData(cardId);
  const {
    isAudit,
    isVerified,
  } = reduxHooks.useCardEnrollmentData(cardId);
  const { isPassing } = reduxHooks.useCardGradeData(cardId);
  const { isArchived } = reduxHooks.useCardCourseRunData(cardId);
  const { minPassingGrade, progressUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { supportEmail, billingEmail } = reduxHooks.usePlatformSettingsData();
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
