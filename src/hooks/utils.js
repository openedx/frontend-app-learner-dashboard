import React from 'react';
import { useIntl } from '@openedx/frontend-base';
import dateFormatter from '../utils/dateFormatter';

export const useValueCallback = (cb, prereqs = []) => (
  React.useCallback(e => cb(e.target.value), prereqs) // eslint-disable-line
);

export const useFormatDate = () => {
  const { formatDate } = useIntl();
  return (date) => dateFormatter(formatDate, date);
};

export default {
  useFormatDate,
  useValueCallback,
};
