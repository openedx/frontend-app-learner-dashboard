import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';

export const findCoursesClicked = (href, args = {}) => createLinkTracker(
  createEventTracker(eventNames.findCoursesClicked, {
    pageName: 'learner_home',
    linkType: 'button',
    linkCategory: categories.searchButton,
    ...args,
  }),
  href,
);

export default {
  findCoursesClicked,
};
