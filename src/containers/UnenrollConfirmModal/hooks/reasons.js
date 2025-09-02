import React from 'react';

import {
  apiHooks,
  reduxHooks,
  utilHooks,
} from 'hooks';
import { StrictDict } from 'utils';
import track from 'tracking';

import * as module from './reasons';
import constants from '../constants';

export const state = StrictDict({
  customOption: (val) => React.useState(val), // eslint-disable-line
  selectedReason: (val) => React.useState(val), // eslint-disable-line
  isSubmitted: (val) => React.useState(val), //eslint-disable-line
});

export const useUnenrollReasons = ({
  cardId,
}) => {
  // The selected option element from the menu
  const [selectedReason, setSelectedReason] = module.state.selectedReason(
    constants.reasonKeys.preferNotToSay,
  );
  // Custom option element entry value
  const [customOption, setCustomOption] = module.state.customOption('');

  // Did the user submit an unenrollment reason
  const [isSubmitted, setIsSubmitted] = module.state.isSubmitted(false);

  const { isEntitlement } = reduxHooks.useCardEntitlementData(cardId);

  const submittedReason = selectedReason === 'custom' ? customOption : selectedReason;
  const hasReason = ![null, ''].includes(submittedReason);

  const handleTrackReasons = reduxHooks.useTrackCourseEvent(
    track.engagement.unenrollReason,
    cardId,
    submittedReason,
    isEntitlement,
  );

  const unenrollFromCourse = apiHooks.useUnenrollFromCourse(cardId);

  const handleClear = () => {
    setSelectedReason(null);
    setCustomOption('');
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    handleTrackReasons(e);
    setIsSubmitted(true);
    unenrollFromCourse();
  };

  const handleCustomOptionChange = utilHooks.useValueCallback(setCustomOption);
  const handleSelectOption = utilHooks.useValueCallback(setSelectedReason);

  return {
    customOption: { value: customOption, onChange: handleCustomOptionChange },
    handleClear,
    handleSubmit,
    hasReason,
    isSubmitted,
    selectOption: handleSelectOption,
    submittedReason,
  };
};
