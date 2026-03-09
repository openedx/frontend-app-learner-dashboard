import React from 'react';

import { useAppConfig } from '@openedx/frontend-base';
import { StrictDict } from '@src/utils';
import { useCourseData } from '@src/hooks';
import { useUnenrollFromCourse } from '@src/data/hooks';

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
  const appConfig = useAppConfig();
  const courseData = useCourseData(cardId);
  const courseId = courseData?.courseRun?.courseId;

  const { mutate: unenrollFromCourse } = useUnenrollFromCourse();

  const confirm = () => {
    if (!appConfig.SHOW_UNENROLL_SURVEY) {
      unenrollFromCourse({ courseId });
    }
    setIsConfirmed(true);
  };

  let modalState;
  if (isConfirmed) {
    modalState = (reason.isSubmitted || !appConfig.SHOW_UNENROLL_SURVEY)
      ? modalStates.finished : modalStates.reason;
  } else {
    modalState = modalStates.confirm;
  }

  const close = () => {
    closeModal();
    setIsConfirmed(false);
    reason.handleClear();
  };

  return {
    isConfirmed,
    confirm,
    reason,
    close,
    closeAndRefresh: close,
    modalState,
  };
};

export default useUnenrollData;
