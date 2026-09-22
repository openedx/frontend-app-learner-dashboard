import { isInternalUrl } from '@openedx/frontend-base';

import { createLinkTracker, createEventTracker } from '../../data/services/segment/utils';
import { categories, eventNames } from '../constants';

export const findCoursesClicked = (href, args = {}) => {
  const tracker = createEventTracker(eventNames.findCoursesClicked, {
    pageName: 'learner_home',
    linkType: 'button',
    linkCategory: categories.searchButton,
    ...args,
  });
  // A path in this site is followed by react-router in the client, so the event is just sent
  // along the way.  Anything else is a full page load, which createLinkTracker holds back until
  // the event is on its way.
  return isInternalUrl(href) ? tracker : createLinkTracker(tracker, href);
};

export default {
  findCoursesClicked,
};
