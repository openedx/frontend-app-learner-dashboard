import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

export const useValueCallback = (cb, prereqs = []) => (
  React.useCallback(e => cb(e.target.value), prereqs) // eslint-disable-line
);

export const nullMethod = () => ({});

export { useIntl };

export default {
  useValueCallback,
  nullMethod,
  useIntl,
};
