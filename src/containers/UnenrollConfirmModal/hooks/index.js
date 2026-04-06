import React from 'react';

import { StrictDict } from 'utils';

import { useInitializeLearnerHome, useUnenrollFromCourse } from 'data/hooks';
import { configuration } from 'config';
import { useCourseData } from 'hooks';
import { useUnenrollReasons } from './reasons';
import * as module from '.';

export const state = StrictDict({
  confirmed: (val) => React.useState(val), // eslint-disable-line
});

export const modalStates = StrictDict({
  confirm: 'confirm',
  reason: 'reason',
  finished: 'finished',
});

export const useUnenrollData = ({ closeModal, cardId }) => {
  const [isConfirmed, setIsConfirmed] = module.state.confirmed(false);
  const reason = useUnenrollReasons({ cardId });
  const { refetch: refreshList } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const courseId = courseData?.courseRun?.courseId;

  const { mutate: unenrollFromCourse } = useUnenrollFromCourse();

  const confirm = () => {
    if (!configuration.SHOW_UNENROLL_SURVEY) {
      unenrollFromCourse({ courseId });
    }
    setIsConfirmed(true);
  };

  let modalState;
  if (isConfirmed) {
    modalState = (reason.isSubmitted || !configuration.SHOW_UNENROLL_SURVEY)
      ? modalStates.finished : modalStates.reason;
  } else {
    modalState = modalStates.confirm;
  }

  const close = () => {
    closeModal();
    setIsConfirmed(false);
    reason.handleClear();
  };
  const closeAndRefresh = () => {
    refreshList();
    close();
  };

  return {
    isConfirmed,
    confirm,
    reason,
    close,
    closeAndRefresh,
    modalState,
  };
};

export default useUnenrollData;
