import { useIntl } from '@openedx/frontend-base';

import dateFormatter from './dateFormatter';

export const useFormatDate = () => {
  const { formatDate } = useIntl();
  return (date) => dateFormatter(formatDate, date);
};

export default {
  useFormatDate,
};
