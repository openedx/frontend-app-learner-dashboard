import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, MailtoLink } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';

import Banner from 'components/Banner';
import messages from './messages';

export const EntitlementBanner = ({ courseNumber }) => {
  const {
    isEntitlement,
    hasSessions,
    isFulfilled,
    changeDeadline,
    showExpirationWarning,
  } = appHooks.useCardEntitlementsData(courseNumber);
  const { supportEmail } = appHooks.usePlatformSettingsData();
  const { formatDate, formatMessage } = useIntl();

  if (!isEntitlement) {
    return null;
  }

  if (!hasSessions && !isFulfilled) {
    return (
      <Banner variant="warning">
        {formatMessage(messages.entitlementsUnavailable, {
          emailLink: supportEmail && <MailtoLink to={supportEmail}>{supportEmail}</MailtoLink>,
        })}
      </Banner>
    );
  }
  if (showExpirationWarning) {
    return (
      <Banner>
        {formatMessage(messages.entitlementsExpiringSoon, {
          changeDeadline: formatDate(changeDeadline),
          selectSessionButton: (
            <Button variant="link" size="inline" className="m-0 p-0">
              {formatMessage(messages.selectSession)}
            </Button>
          ),
        })}
      </Banner>
    );
  }
  return null;
};
EntitlementBanner.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default EntitlementBanner;
