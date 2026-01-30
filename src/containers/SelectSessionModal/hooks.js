import React, { useMemo } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { StrictDict } from 'utils';

import track from 'tracking';

import { useCourseData } from 'hooks';
import { useDeleteEntitlementEnrollment, useUpdateEntitlementEnrollment } from 'data/react-query/apiHooks';
import { useSelectSessionModal } from 'data/context/SelectSessionProvider';
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
  const leaveEntitlementSession = () => leaveEntitlement({ uuid, isRefundable });
  const { mutate: switchEntitlementMutation } = useUpdateEntitlementEnrollment();
  const switchEntitlementEnrollment = (selectedId) => switchEntitlementMutation({ uuid, courseId: selectedId });
  const newEntitlementEnrollment = (selectedId) => switchEntitlementMutation({ uuid, courseId: selectedId });

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
    if (selectedSession === LEAVE_OPTION) {
      trackLeaveSession();
      leaveEntitlementSession();
    } else if (isEnrolled) {
      trackSwitchSession();
      switchEntitlementEnrollment(selectedSession);
    } else {
      trackNewSession();
      newEntitlementEnrollment(selectedSession);
    }
    closeSessionModal();
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
