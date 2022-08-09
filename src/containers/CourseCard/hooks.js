import { useIntl } from '@edx/frontend-platform/i18n';
import { hooks as appHooks } from 'data/redux';

export const useCardData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { title, bannerUrl } = appHooks.useCardCourseData(cardId);
  const { isEnrolled } = appHooks.useCardEnrollmentData(cardId);

  return {
    isEnrolled,
    title,
    bannerUrl,
    formatMessage,
  };
};

export default useCardData;
