import { useIntl } from '@edx/frontend-platform/i18n';
import { hooks as appHooks } from 'data/redux';

export const useCardData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { title, bannerImgSrc } = appHooks.useCardCourseData(cardId);
  const { isEnrolled } = appHooks.useCardEnrollmentData(cardId);

  return {
    isEnrolled,
    title,
    bannerImgSrc,
    formatMessage,
  };
};

export default useCardData;
