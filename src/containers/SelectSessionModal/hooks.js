import React, { useMemo } from 'react';

import { useIntl } from '@openedx/frontend-base';

import { StrictDict } from '@src/utils';

import track from '@src/tracking';

import { useCourseData } from '@src/hooks';
import { useDeleteEntitlementEnrollment, useUpdateEntitlementEnrollment } from '@src/data/hooks';
import { useSelectSessionModal } from '@src/data/context';
import { LEAVE_OPTION } from './constants';
import messages from './messages';
import * as module from './hooks';

export const state = StrictDict({
  selectedSession: (val) => React.useState(val), // eslint-disable-line
});

export const useSelectSessionModalData = () => {
  const { formatMessage } = useIntl();
  const { selectSessionModal, closeSelectSessionModal: closeSessionModal } = useSelectSessionModal();
  const selectedCardId = selectSessionModal.cardId;
  const courseData = useCourseData(selectedCardId);
  const {
    availableSessions,
    isFulfilled,
    courseTitle,
    courseId,
    isEnrolled,
    uuid,
    isRefundable,
  } = useMemo(() => ({
    availableSessions: courseData?.entitlement?.availableSessions || [],
    isFulfilled: courseData?.entitlement?.isFulfilled || false,
    courseTitle: courseData?.course?.title || courseData?.course?.courseName || '',
    courseId: courseData?.courseRun?.courseId || null,
    isEnrolled: courseData?.enrollment?.isEnrolled || false,
    uuid: courseData?.entitlement?.uuid || null,
    isRefundable: courseData?.entitlement?.isRefundable || false,
  }), [courseData]);
  const { mutate: leaveEntitlement } = useDeleteEntitlementEnrollment();
  const { mutate: switchEntitlementMutation } = useUpdateEntitlementEnrollment();

  const [selectedSession, setSelectedSession] = module.state.selectedSession(courseId || null);

  let header;
  let hint;
  if (isFulfilled) {
    header = formatMessage(messages.changeOrLeaveHeader);
    hint = formatMessage(messages.changeOrLeaveHint);
  } else {
    header = formatMessage(messages.selectSessionHeader, { courseTitle });
    hint = formatMessage(messages.selectSessionHint);
  }

  const trackNewSession = track.entitlements.newSession(selectedSession);
  const trackSwitchSession = track.entitlements.switchSession(selectedCardId, selectedSession);
  const trackLeaveSession = track.entitlements.leaveSession(selectedCardId);

  const handleSelection = ({ target: { value } }) => setSelectedSession(value);
  const handleSubmit = () => {
    const onSuccess = () => closeSessionModal();
    if (selectedSession === LEAVE_OPTION) {
      trackLeaveSession();
      leaveEntitlement({ uuid, isRefundable }, { onSuccess });
    } else if (isEnrolled) {
      trackSwitchSession();
      switchEntitlementMutation({ uuid, courseId: selectedSession }, { onSuccess });
    } else {
      trackNewSession();
      switchEntitlementMutation({ uuid, courseId: selectedSession }, { onSuccess });
    }
  };

  return {
    showModal: selectedCardId != null,
    closeSessionModal,
    showLeaveOption: isFulfilled,
    availableSessions,
    hint,
    header,
    selectedSession,
    handleSelection,
    handleSubmit,
  };
};

export default useSelectSessionModalData;
