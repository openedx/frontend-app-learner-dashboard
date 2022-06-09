import { useSelector } from 'react-redux';

import { selectors } from 'data/redux';

const { cardData } = selectors;

export const getCardValue = (courseNumber) => (sel) => (
  useSelector(cardData.cardSelector(sel, courseNumber))
);

export const getCardValues = (courseNumber, mapping) => {
  const cardValue = getCardValue(courseNumber);
  return Object.keys(mapping).reduce(
    (obj, key) => ({ ...obj, [key]: cardValue(mapping[key]) }),
    {},
  );
};

export const nullMethod = () => ({});

export default {
  nullMethod,
};
