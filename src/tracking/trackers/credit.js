import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { creditPurchaseUrl } from 'data/services/lms/urls';
import { categories, eventNames } from '../constants';

/**
 * Create event tracker for purchase credit event
 * @param {string} fromCourseRun - course run identifier for leaving course
 * @return {callback} - callback that triggers the event tracker
 */
export const purchase = (courseId) => createLinkTracker(
  createEventTracker(eventNames.purchaseCredit, {
    label: courseId,
    category: categories.credit,
  }),
  creditPurchaseUrl(courseId),
);

export default {
  purchase,
};
