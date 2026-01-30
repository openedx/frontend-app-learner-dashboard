import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, MailtoLink } from '@openedx/paragon';

import { utilHooks, useCourseData } from 'hooks';
import { useSelectSessionModal } from 'data/context/SelectSessionProvider';
import Banner from 'components/Banner';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import { useEntitlementInfo } from '../hooks';

import messages from './messages';

export const EntitlementBanner = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { data: learnerHomeData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);

  const {
    isEntitlement,
    hasSessions,
    isFulfilled,
    changeDeadline,
    showExpirationWarning,
    isExpired,
  } = useEntitlementInfo(courseData);
  const supportEmail = useMemo(
    () => learnerHomeData?.platformSettings?.supportEmail,
    [learnerHomeData],
  );
  const { updateSelectSessionModal } = useSelectSessionModal();
  const formatDate = utilHooks.useFormatDate();

  if (!isEntitlement) {
    return null;
  }

  if (!hasSessions && !isFulfilled) {
    return (
      <Banner variant="warning">
        {formatMessage(messages.entitlementUnavailable, {
          emailLink: supportEmail && <MailtoLink to={supportEmail}>{supportEmail}</MailtoLink>,
        })}
      </Banner>
    );
  }
  if (showExpirationWarning) {
    return (
      <Banner>
        {formatMessage(messages.entitlementExpiringSoon, {
          changeDeadline: formatDate(changeDeadline),
          selectSessionButton: (
            <Button variant="link" size="inline" className="m-0 p-0" onClick={() => updateSelectSessionModal(cardId)}>
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
        {formatMessage(messages.entitlementExpired)}
      </Banner>
    );
  }
  return null;
};
EntitlementBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default EntitlementBanner;
