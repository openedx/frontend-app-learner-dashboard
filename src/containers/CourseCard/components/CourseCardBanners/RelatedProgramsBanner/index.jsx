import React from 'react';
import PropTypes from 'prop-types';

import { Program } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import Banner from 'components/Banner';

import ProgramList from './ProgramsList';
import messages from './messages';

export const RelatedProgramsBanner = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const programData = reduxHooks.useCardRelatedProgramsData(cardId);

  if (!programData?.length) {
    return null;
  }

  return (
    <Banner
      icon={Program}
      className="bg-white border-top border-bottom mb-0 related-programs-banner"
    >
      <span className="font-weight-bolder">
        {formatMessage(messages.relatedPrograms)}
      </span>
      <ProgramList programs={programData.list} />
    </Banner>
  );
};
RelatedProgramsBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default RelatedProgramsBanner;
