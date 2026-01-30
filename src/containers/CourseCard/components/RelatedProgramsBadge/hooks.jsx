import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { StrictDict } from 'utils';
import { useCourseData } from 'hooks';

import messages from './messages';
import * as module from './hooks';

export const state = StrictDict({
  isOpen: (val) => React.useState(val), // eslint-disable-line
});

export const useRelatedProgramsBadgeData = ({ cardId }) => {
  const [isOpen, setIsOpen] = module.state.isOpen(false);
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);
  const numPrograms = courseData?.programs?.relatedPrograms?.length || 0;
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
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  };
};

export default useRelatedProgramsBadgeData;
