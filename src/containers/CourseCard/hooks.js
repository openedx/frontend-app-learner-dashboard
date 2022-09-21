import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { hooks as appHooks } from 'data/redux';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.small.maxWidth;
};

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
