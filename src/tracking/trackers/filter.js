import { createEventTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';

export const filterClicked = () => createEventTracker(
  eventNames.filterClicked,
  { category: categories.filter },
)();

export const filterOptionSelected = (filters = []) => createEventTracker(
  eventNames.filterOptionSelected,
  {
    category: categories.filter,
    // make sure to clone before sorting
    filters: [...filters].sort(),
  },
)();

export default {
  filterClicked,
  filterOptionSelected,
};
