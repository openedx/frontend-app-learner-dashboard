import { createEventTracker } from 'data/services/segment/utils';
import { eventNames } from '../constants';
import * as trackers from './enterpriseDashboard';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn(args => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((cb, href) => ({ createLinkTracker: { cb, href } })),
}));

const enterpriseUUID = 'test-enterprise-uuid';
const source = 'test-source';

describe('enterpriseDashboard trackers', () => {
  describe('modalOpened', () => {
    it('creates event tracker for dashboard modal opened event', () => {
      expect(trackers.modalOpened(enterpriseUUID, source)()).toEqual(
        createEventTracker(
          eventNames.enterpriseDashboardModalOpened,
          { enterpriseUUID, source },
        ),
      );
    });
  });
  describe('modalCTAClicked', () => {
    const testHref = 'test-href';
    it('creates link tracker for dashboard modal cta click event', () => {
      const { cb, href } = trackers.modalCTAClicked(enterpriseUUID, testHref).createLinkTracker;
      expect(href).toEqual(testHref);
      expect(cb).toEqual(
        createEventTracker(
          eventNames.enterpriseDashboardModalCTAClicked,
          { enterpriseUUID, source },
        ),
      );
    });
  });
  describe('modalClosed', () => {
    it('creates event tracker for dashboard modal closed event with close source', () => {
      expect(trackers.modalClosed(enterpriseUUID, source)).toEqual(
        createEventTracker(
          eventNames.enterpriseDashboardModalClosed,
          { enterpriseUUID, source },
        ),
      );
    });
  });
});
