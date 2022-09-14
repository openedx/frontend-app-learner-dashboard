import { useIntl } from '@edx/frontend-platform/i18n';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { hooks as appHooks } from 'data/redux';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.small.maxWidth;
};

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
