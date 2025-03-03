import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { eventNames } from '../constants';

/** Enterprise Dashboard events**/
/**
 * Creates tracking callback for Enterprise Dashboard Modal open event
 * @param {string} enterpriseUUID - enterprise identifier
 * @return {func} - Callback that tracks the event when fired.
 */
export const modalOpened = (enterpriseUUID) => () => createEventTracker(
  eventNames.enterpriseDashboardModalOpened,
  { enterpriseUUID },
);

/**
 * Creates tracking callback for Enterprise Dashboard Modal Call-to-action click-event
 * @param {string} enterpriseUUID - enterprise identifier
 * @param {string} href - destination url
 * @return {func} - Callback that tracks the event when fired and then loads the passed href.
 */
export const modalCTAClicked = (enterpriseUUID, href) => createLinkTracker(
  createEventTracker(
    eventNames.enterpriseDashboardModalCTAClicked,
    { enterpriseUUID },
  ),
  href,
);

/**
 * Creates tracking callback for Enterprise Dashboard Modal close event
 * @param {string} enterpriseUUID - enterprise identifier
 * @param {string} source - close event soruce ("Cancel button" vs "Escape")
 * @return {func} - Callback that tracks the event when fired.
 */
export const modalClosed = (enterpriseUUID, source) => createEventTracker(
  eventNames.enterpriseDashboardModalClosed,
  { enterpriseUUID, source },
);

export default {
  modalOpened,
  modalCTAClicked,
  modalClosed,
};
