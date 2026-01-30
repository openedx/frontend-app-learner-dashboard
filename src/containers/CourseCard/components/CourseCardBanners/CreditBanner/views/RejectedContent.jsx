import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { useCourseData } from 'hooks';
import CreditContent from './components/CreditContent';
import ProviderLink from './components/ProviderLink';
import messages from './messages';

export const RejectedContent = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const credit = courseData?.credit;
  const { formatMessage } = useIntl();
  return (
    <CreditContent
      message={formatMessage(messages.rejected, {
        providerName: credit?.providerName,
        linkToProviderSite: (<ProviderLink cardId={cardId} />),
      })}
    />
  );
};
RejectedContent.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default RejectedContent;
