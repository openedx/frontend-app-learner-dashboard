import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { useCourseData, useIsMasquerading } from 'hooks';
import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';

import messages from './messages';

export const ApprovedContent = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const { providerStatusUrl: href, providerName } = useMemo(() => {
    const creditData = courseData?.credit;
    return {
      providerStatusUrl: creditData.providerStatusUrl,
      providerName: creditData.providerName,
    };
  }, [courseData]);
  const isMasquerading = useIsMasquerading();
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      action={{ href, message: formatMessage(messages.viewCredit), disabled: isMasquerading }}
      message={formatMessage(
        messages.approved,
        {
          congratulations: <b>{formatMessage(messages.congratulations)}</b>,
          linkToProviderSite: <ProviderLink cardId={cardId} />,
          providerName,
        },
      )}
    />
  );
};
ApprovedContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ApprovedContent;
