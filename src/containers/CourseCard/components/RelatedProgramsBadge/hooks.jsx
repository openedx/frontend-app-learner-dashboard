import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { StrictDict } from 'utils';
import { selectors } from 'data/redux';
import { useCardValues } from 'hooks';

import messages from './messages';
import * as module from './hooks';

const { cardData } = selectors;

export const state = StrictDict({
  isOpen: (val) => React.useState(val), // eslint-disable-line
});

export const useRelatedProgramsBadgeData = ({ courseNumber }) => {
  const [isOpen, setIsOpen] = module.state.isOpen(false);
  const { formatMessage } = useIntl();
  const { numPrograms } = useCardValues(courseNumber, {
    numPrograms: cardData.numRelatedPrograms,
  });

  let programsMessage = '';
  if (numPrograms) {
    programsMessage = formatMessage(
      numPrograms === 1 ? messages.badgeLabelSingular : messages.badgeLabelPlural,
      { numPrograms },
    );
  }

  return {
    numPrograms,
    programsMessage,
    isOpen,
    openModal: React.useCallback(() => setIsOpen(true), [setIsOpen]),
    closeModal: React.useCallback(() => setIsOpen(false), [setIsOpen]),
  };
};

export default useRelatedProgramsBadgeData;
