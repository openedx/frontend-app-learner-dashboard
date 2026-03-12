import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@openedx/frontend-base';

import { useCourseData, useIsMasquerading } from '@src/hooks';
import CreditContent from './components/CreditContent';
import messages from './messages';

export const PendingContent = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const { providerStatusUrl: href, providerName } = courseData?.credit || {};
  const isMasquerading = useIsMasquerading();
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      action={{
        href,
        message: formatMessage(messages.viewDetails),
        disabled: isMasquerading,
      }}
      message={formatMessage(messages.received, { providerName })}
    />
  );
};
PendingContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default PendingContent;
