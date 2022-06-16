import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';

import { selectors } from 'data/redux';

const { cardData } = selectors;

export const useCardValue = (courseNumber, sel) => (
  useSelector(cardData.cardSelector(sel, courseNumber))
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
