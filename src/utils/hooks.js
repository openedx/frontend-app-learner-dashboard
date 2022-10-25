import { useIntl } from '@edx/frontend-platform/i18n';

import dateFormatter from './dateFormatter';

export const useFormatDate = () => {
  const { formatDate } = useIntl();
  return (date) => dateFormatter(formatDate, date);
};

export default {
  useFormatDate,
};
