import { useIntl } from '@edx/frontend-platform/i18n';

import dateFormatter, { shortDateFormatter } from './dateFormatter';

export const useFormatDate = () => {
  const { formatDate } = useIntl();
  return (date) => dateFormatter(formatDate, date);
};

export const useFormatShortDate = () => {
  const { formatDate } = useIntl();
  return (date) => shortDateFormatter(formatDate, date);
};

export default {
  useFormatDate,
  useFormatShortDate,
};
