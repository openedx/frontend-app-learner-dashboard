import React from 'react';

import { StrictDict } from '@src/utils';
import { useUpdateEmailSettings } from '@src/data/hooks';
import { useCourseData } from '@src/hooks';

import * as module from './hooks';

export const state = StrictDict({
  toggle: (val) => React.useState(val), // eslint-disable-line
});

export const useEmailData = ({
  closeModal,
  cardId,
}) => {
  const courseData = useCourseData(cardId);
  const hasOptedOutOfEmail = courseData?.enrollment?.hasOptedOutOfEmail || false;
  const courseId = courseData?.courseRun?.courseId;
  const [isOptedOut, setIsOptedOut] = module.state.toggle(hasOptedOutOfEmail);
  const { mutate: updateEmailSettings } = useUpdateEmailSettings();
  const onToggle = () => setIsOptedOut(!isOptedOut);
  const save = () => {
    updateEmailSettings(
      { courseId, enable: !isOptedOut },
      { onSuccess: () => closeModal() },
    );
  };

  return {
    onToggle,
    save,
    isOptedOut,
  };
};

export default useEmailData;
