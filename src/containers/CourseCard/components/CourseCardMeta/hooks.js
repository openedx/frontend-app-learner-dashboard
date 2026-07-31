import { useMemo } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { utilHooks, useCourseData } from 'hooks';
import {
  useInitializeLearnerHome, useCourseCompletion, useCourseAssignmentsCardInfo,
} from 'data/hooks';
import { getTransformedCourseDataList } from 'utils/dataTransformers';
import { parseDateOnly } from 'utils/dateFormatter';
import {
  getDueStatus,
  DUE_SOON_WINDOW_DAYS,
  placeholderDueDateOffset,
} from 'utils/dueDate';

import messages from './messages';

/**
 * NOTE: duration, rating, per-course progress %, and due date are not yet exposed by the
 * learner-home API. Until that data exists, this hook fills them in with fixed placeholders
 * (and, for due date, a deterministic-but-varied offset per card) so the card layout can be
 * built and demoed now. Swap these for real `course.*` fields as the API grows to support them.
 */
const PLACEHOLDER_DURATION_HOURS = 4;
const PLACEHOLDER_RATING = 4.5;
const PLACEHOLDER_PROGRESS_PERCENT = 35;

const formatDurationHours = (estimatedDurationHours) => {
  if (estimatedDurationHours === null || estimatedDurationHours === undefined) {
    return null;
  }
  const hours = Number(estimatedDurationHours);
  if (Number.isNaN(hours)) {
    return null;
  }
  const rounded = Math.round(hours * 10) / 10;
  return rounded % 1 === 0 ? rounded.toFixed(0) : `${rounded}`;
};

const useAllDashboardCourseIds = () => {
  const { data } = useInitializeLearnerHome();
  return useMemo(() => {
    const courseList = getTransformedCourseDataList(data?.courses || []);
    return courseList
      .map((courseData) => courseData?.courseRun?.courseId)
      .filter(Boolean);
  }, [data?.courses]);
};

export const useCourseCardMeta = (cardId) => {
  const { formatMessage } = useIntl();
  const formatDate = utilHooks.useFormatDate();
  const courseData = useCourseData(cardId);
  const { course, enrollment, courseRun } = courseData || {};
  const courseId = courseRun?.courseId;

  const { data: completionData } = useCourseCompletion();
  const realProgressPercent = useMemo(() => {
    if (!courseId || !completionData) {
      return null;
    }
    const entry = completionData.find((item) => item.courseId === courseId);
    return entry?.completion ?? null;
  }, [completionData, courseId]);

  const allCourseIds = useAllDashboardCourseIds();
  const { data: cardInfoResponse } = useCourseAssignmentsCardInfo(allCourseIds);
  const cardInfo = useMemo(() => {
    if (!courseId || !cardInfoResponse?.results) {
      return null;
    }
    return cardInfoResponse.results.find((result) => result.course_id === courseId) || null;
  }, [cardInfoResponse, courseId]);

  const providerDisplayName = cardInfo?.provider_display_name || null;
  const contentTypeDisplay = cardInfo?.content_type_display || null;
  const realDurationHours = formatDurationHours(cardInfo?.estimated_duration_hours);

  const dueDate = useMemo(() => {
    if (cardInfo?.due_date) {
      return parseDateOnly(cardInfo.due_date);
    }
    if (course?.dueDate) {
      return parseDateOnly(course.dueDate);
    }
    const placeholder = new Date();
    placeholder.setDate(placeholder.getDate() + placeholderDueDateOffset(cardId));
    return placeholder;
  }, [cardInfo?.due_date, course?.dueDate, cardId]);

  const {
    daysUntilDue,
    daysOverdue: computedDaysOverdue,
    isOverdue: computedIsOverdue,
  } = useMemo(() => getDueStatus(dueDate), [dueDate]);

  // Prefer API overdue flag when a real assignment due date exists.
  const isOverdue = cardInfo?.due_date ? Boolean(cardInfo?.is_overdue) : computedIsOverdue;
  const isDueSoon = !isOverdue && daysUntilDue <= DUE_SOON_WINDOW_DAYS;
  const daysOverdue = isOverdue ? Math.abs(daysUntilDue) || computedDaysOverdue : 0;

  const hasStarted = enrollment?.hasStarted || false;
  const progressPercent = course?.progressPercent ?? realProgressPercent ?? PLACEHOLDER_PROGRESS_PERCENT;
  const rating = course?.rating ?? PLACEHOLDER_RATING;
  const durationHours = course?.durationHours ?? realDurationHours ?? PLACEHOLDER_DURATION_HOURS;

  return {
    providerDisplayName,
    contentType: contentTypeDisplay || formatMessage(messages.contentTypeVideo),
    durationLabel: formatMessage(messages.durationHours, { hours: durationHours }),
    dueDateLabel: formatMessage(messages.dueDate, { dueDate: formatDate(dueDate) }),
    rating,
    isOverdue,
    isDueSoon,
    daysOverdue,
    hasStarted,
    progressPercent,
  };
};

export default useCourseCardMeta;
