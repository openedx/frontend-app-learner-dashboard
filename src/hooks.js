import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';

export const useCardValue = (courseNumber, sel) => (
  useSelector(state => sel(state, courseNumber))
);

export const useCardValues = (courseNumber, mapping) => (
  Object.keys(mapping).reduce(
    // eslint-disable-next-line
    (obj, key) => ({ ...obj, [key]: useCardValue(courseNumber, mapping[key]) }),
    {},
  )
);

export const useValueCallback = (cb, prereqs = []) => (
  React.useCallback(e => cb(e.target.value), prereqs) // eslint-disable-line
);

export const nullMethod = () => ({});

export { useIntl };

export default {
  useCardValues,
  useValueCallback,
  nullMethod,
  useIntl,
};
