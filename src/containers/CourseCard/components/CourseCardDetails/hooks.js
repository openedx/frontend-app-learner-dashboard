import { useIntl } from '@edx/frontend-platform/i18n';
import { utilHooks, useCourseData } from 'hooks';
import { useSelectSessionModal } from 'data/context/SelectSessionProvider';
import { useEntitlementInfo } from '../hooks';

import * as hooks from './hooks';
import messages from './messages';

export const useAccessMessage = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);
  const { courseRun, enrollment } = courseData || {};
  const formatDate = utilHooks.useFormatDate();
  if (!courseRun.isStarted) {
    if (!courseRun.startDate && !courseRun.advertisedStart) { return null; }
    const startDate = courseRun.advertisedStart ? courseRun.advertisedStart : formatDate(courseRun.startDate);
    return formatMessage(messages.courseStarts, { startDate });
  }
  if (enrollment?.isEnrolled) {
    const { isArchived, endDate } = courseRun;
    const {
      accessExpirationDate,
      isAuditAccessExpired,
    } = enrollment;

    if (enrollment.isAudit && accessExpirationDate) {
      return formatMessage(
        isAuditAccessExpired ? messages.accessExpired : messages.accessExpires,
        { accessExpirationDate: formatDate(accessExpirationDate) },
      );
    }
    if (!endDate) { return null; }
    return formatMessage(
      isArchived ? messages.courseEnded : messages.courseEnds,
      { endDate: formatDate(endDate) },
    );
  }
  return null;
};

export const useCardDetailsData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);
  const providerName = courseData?.courseProvider?.name;
  const courseNumber = courseData?.course?.courseNumber;
  const {
    isEntitlement,
    isFulfilled,
    canChange,
  } = useEntitlementInfo(courseData);
  const updateSelectSessionModal = useSelectSessionModal();

  return {
    providerName: providerName || formatMessage(messages.unknownProviderName),
    accessMessage: hooks.useAccessMessage({ cardId }),
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal: () => updateSelectSessionModal(cardId),
    courseNumber,
    changeOrLeaveSessionMessage: formatMessage(messages.changeOrLeaveSessionButton),
  };
};

export default useCardDetailsData;
