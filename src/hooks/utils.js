import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import dateFormatter, { shortDateFormatter } from 'utils/dateFormatter';

export const useValueCallback = (cb, prereqs = []) => (
  React.useCallback(e => cb(e.target.value), prereqs) // eslint-disable-line
);

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
  useValueCallback,
};
