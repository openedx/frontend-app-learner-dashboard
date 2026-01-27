import { createEventTracker, createLinkTracker } from '@src/data/services/segment/utils';
import { creditPurchaseUrl } from '@src/data/services/lms/urls';

import { eventNames, categories } from '@src/tracking/constants';
import * as trackers from './credit';

jest.mock('@src/data/services/segment/utils', () => ({
  createEventTracker: jest.fn(args => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((cb, href) => ({ createLinkTracker: { cb, href } })),
}));

jest.mock('@src/data/services/lms/urls', () => ({
  creditPurchaseUrl: jest.fn(courseId => `credit-purchase-url/${courseId}`),
}));

const courseId = 'test-course-id';

describe('credit trackers', () => {
  describe('purchase', () => {
    it('creates a link tracker for purchase credit event with category and label', () => {
      const purchasedEvent = trackers.purchase(courseId);

      expect(creditPurchaseUrl).toHaveBeenCalledWith(courseId);
      expect(createEventTracker).toHaveBeenCalledWith(eventNames.purchaseCredit, {
        label: courseId,
        category: categories.credit,
      });

      expect(purchasedEvent).toEqual(createLinkTracker(
        createEventTracker(eventNames.purchaseCredit, {
          label: courseId,
          category: categories.credit,
        }),
        creditPurchaseUrl(courseId),
      ));
    });
  });
});
