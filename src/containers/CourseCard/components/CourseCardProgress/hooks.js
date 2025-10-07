import { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

import { reduxHooks } from 'hooks';
import messages from './messages';

export const useCourseProgress = ({ cardId }) => {
  const [progress, setProgress] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isEnrolled, hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!isEnrolled || !hasStarted || !courseId) {
        setProgress(0);
        setCompleteCount(0);
        setTotalCount(0);
        return;
      }

      setLoading(true);
      try {
        const client = getAuthenticatedHttpClient();
        const lmsApiUrl = `${getConfig().LMS_BASE_URL}/api/course_home/v1/progress/${courseId}`;
        const response = await client.get(lmsApiUrl);
        const progressData = response.data;

        let progressPercent = 0;
        let complete = 0;
        let total = 0;

        // Check for completion_summary from course_home API
        if (progressData.completion_summary) {
          const { complete_count, incomplete_count, locked_count } = progressData.completion_summary;
          complete = complete_count;
          total = complete_count + incomplete_count + locked_count;
          if (total > 0) {
            progressPercent = Math.round((complete_count / total) * 100);
          }
        } else if (progressData.completion_percentage !== undefined) {
          progressPercent = progressData.completion_percentage;
        } else if (progressData.progress?.percent !== undefined) {
          progressPercent = Math.round(progressData.progress.percent * 100);
        } else if (progressData.progress_percentage !== undefined) {
          progressPercent = progressData.progress_percentage;
        } else if (progressData.percent !== undefined) {
          progressPercent = progressData.percent;
        }

        setProgress(Math.max(0, Math.min(100, progressPercent)));
        setCompleteCount(complete);
        setTotalCount(total);
      } catch (error) {
        console.warn('Failed to fetch course progress:', error);
        setProgress(0);
        setCompleteCount(0);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [cardId, isEnrolled, hasStarted, courseId]);

  return { progress, completeCount, totalCount, loading };
};

export const useProgressVariant = ({ progress }) => {
  if (progress >= 75) return 'success';
  if (progress >= 50) return 'warning';
  return 'info';
};

export const useCardProgressData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { isEnrolled } = reduxHooks.useCardEnrollmentData(cardId);
  const {
    progress, completeCount, totalCount, loading,
  } = useCourseProgress({ cardId });
  const variant = useProgressVariant({ progress });

  return {
    shouldRender: isEnrolled,
    progress,
    completeCount,
    totalCount,
    loading,
    variant,
    progressLabel: formatMessage(messages.courseProgress),
    loadingLabel: formatMessage(messages.loading),
  };
};

export default useCardProgressData;
