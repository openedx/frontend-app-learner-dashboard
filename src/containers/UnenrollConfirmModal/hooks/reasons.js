import React from 'react';

import { thunkActions, hooks as appHooks } from 'data/redux';
import { useValueCallback } from 'hooks';
import { StrictDict } from 'utils';
import track from 'tracking';

import * as module from './reasons';

export const state = StrictDict({
  customOption: (val) => React.useState(val), // eslint-disable-line
  isSkipped: (val) => React.useState(val), // eslint-disable-line
  selectedReason: (val) => React.useState(val), // eslint-disable-line
  isSubmitted: (val) => React.useState(val), //eslint-disable-line
});

export const useTrackUnenrollReasons = ({ cardId, submittedReason }) => {
  const { isEntitlement } = appHooks.useCardEntitlementData(cardId);
  return appHooks.useTrackCourseEvent(
    track.engagement.unenrollReason,
    cardId,
    submittedReason,
    isEntitlement,
  );
};

export const useUnenrollReasons = ({
  dispatch,
  cardId,
}) => {
  // The selected option element from the menu
  const [selectedReason, setSelectedReason] = module.state.selectedReason(null);
  // Custom option element entry value
  const [customOption, setCustomOption] = module.state.customOption('');

  // Did the user choose to skip selecting a reason?
  const [isSkipped, setIsSkipped] = module.state.isSkipped(false);
  // Did the user submit an unenrollment reason
  const [isSubmitted, setIsSubmitted] = module.state.isSubmitted(false);

  const submittedReason = selectedReason === 'custom' ? customOption : selectedReason;

  const handleTrackReasons = module.useTrackUnenrollReasons({ cardId, submittedReason });

  const handleClear = () => {
    setSelectedReason(null);
    setCustomOption('');
    setIsSkipped(false);
    setIsSubmitted(false);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    dispatch(thunkActions.app.unenrollFromCourse(cardId));
  };

  const handleSubmit = (e) => {
    handleTrackReasons(e);
    setIsSubmitted(true);
    dispatch(thunkActions.app.unenrollFromCourse(cardId, submittedReason));
  };

  return {
    customOption: { value: customOption, onChange: useValueCallback(setCustomOption) },
    handleClear,
    handleSkip,
    handleSubmit,
    isSkipped,
    isSubmitted,
    selectOption: useValueCallback(setSelectedReason),
    submittedReason,
  };
};
