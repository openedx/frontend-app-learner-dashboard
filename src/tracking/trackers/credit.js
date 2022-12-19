import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';

/**
 * Create event tracker for purchase credit event
 * @param {string} fromCourseRun - course run identifier for leaving course
 * @return {callback} - callback that triggers the event tracker
 */
export const purchase = (courseKey, href) => createLinkTracker(
  createEventTracker(eventNames.purchaseCredit, {
    label: courseKey,
    category: categories.credit,
  }),
  href,
);

export default {
  purchase,
};
