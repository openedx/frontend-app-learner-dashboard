import { useIntl } from '@edx/frontend-platform/i18n';
import { hooks as appHooks } from 'data/redux';

export const useCardData = ({ courseNumber }) => {
  const { formatMessage } = useIntl();
  const { title, bannerUrl } = appHooks.useCardCourseData(courseNumber);

  return {
    title,
    bannerUrl,
    formatMessage,
  };
};

export default useCardData;
