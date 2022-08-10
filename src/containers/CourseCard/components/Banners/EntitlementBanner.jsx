import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, MailtoLink } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';
import { dateFormatter } from 'utils';

import Banner from 'components/Banner';
import messages from './messages';

export const EntitlementBanner = ({ cardId }) => {
  const dispatch = useDispatch();
  const {
    isEntitlement,
    hasSessions,
    isFulfilled,
    changeDeadline,
    showExpirationWarning,
    isExpired,
  } = appHooks.useCardEntitlementsData(cardId);
  const { supportEmail } = appHooks.usePlatformSettingsData();
  const openSessionModal = appHooks.useUpdateSelectSessionModalCallback(dispatch, cardId);
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
          changeDeadline: dateFormatter(formatDate, changeDeadline),
          selectSessionButton: (
            <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
              {formatMessage(messages.selectSession)}
            </Button>
          ),
        })}
      </Banner>
    );
  }
  if (isExpired) {
    return (
      <Banner>
        {formatMessage(messages.entitlementsExpired)}
      </Banner>
    );
  }
  return null;
};
EntitlementBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default EntitlementBanner;
