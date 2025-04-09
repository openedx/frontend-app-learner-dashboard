import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@openedx/paragon';
import { reduxHooks } from '@src/hooks';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.small.maxWidth;
};

export const useCardData = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { title, bannerImgSrc } = reduxHooks.useCardCourseData(cardId);
  const { isEnrolled } = reduxHooks.useCardEnrollmentData(cardId);

  return {
    isEnrolled,
    title,
    bannerImgSrc,
    formatMessage,
  };
};

export default useCardData;
