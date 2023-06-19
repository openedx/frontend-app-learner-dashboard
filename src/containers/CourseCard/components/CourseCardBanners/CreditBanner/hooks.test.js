import { keyStore } from 'utils';
import { reduxHooks } from 'hooks';

import ApprovedContent from './views/ApprovedContent';
import EligibleContent from './views/EligibleContent';
import MustRequestContent from './views/MustRequestContent';
import PendingContent from './views/PendingContent';
import RejectedContent from './views/RejectedContent';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
    usePlatformSettingsData: jest.fn(),
  },
}));
jest.mock('./views/ApprovedContent', () => 'ApprovedContent');
jest.mock('./views/EligibleContent', () => 'EligibleContent');
jest.mock('./views/MustRequestContent', () => 'MustRequestContent');
jest.mock('./views/PendingContent', () => 'PendingContent');
jest.mock('./views/RejectedContent', () => 'RejectedContent');

const cardId = 'test-card-id';
const statuses = keyStore(hooks.statusComponents);
const supportEmail = 'test-support-email';
let out;

const defaultProps = {
  isEligible: true,
  error: false,
  isPurchased: false,
  requestStatus: null,
};

const loadHook = (creditData = {}) => {
  reduxHooks.useCardCreditData.mockReturnValue({ ...defaultProps, ...creditData });
  out = hooks.useCreditBannerData(cardId);
};

describe('useCreditBannerData hook', () => {
  beforeEach(() => {
    reduxHooks.usePlatformSettingsData.mockReturnValue({ supportEmail });
  });
  it('loads card credit data with cardID and loads platform settings data', () => {
    loadHook({ isEligible: false });
    expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    expect(reduxHooks.usePlatformSettingsData).toHaveBeenCalledWith();
  });
  describe('non-credit-eligible learner', () => {
    it('returns null if the learner is not credit eligible', () => {
      loadHook({ isEligible: false });
      expect(out).toEqual(null);
    });
  });
  describe('credit-eligible learner', () => {
    it('returns error object from credit', () => {
      loadHook();
      expect(out.error).toEqual(defaultProps.error);
      loadHook({ error: true });
      expect(out.error).toEqual(true);
    });
    describe('ContentComponent', () => {
      it('returns EligibleContent if not purchased', () => {
        loadHook();
        expect(out.ContentComponent).toEqual(EligibleContent);
      });
      it('returns MustRequestContent if purchased but not requested', () => {
        loadHook({ purchased: true });
        expect(out.ContentComponent).toEqual(MustRequestContent);
      });
      it('returns PendingContent if purchased and request is pending', () => {
        loadHook({ purchased: true, requestStatus: statuses.pending });
        expect(out.ContentComponent).toEqual(PendingContent);
      });
      it('returns ApprovedContent if purchased and request is approved', () => {
        loadHook({ purchased: true, requestStatus: statuses.approved });
        expect(out.ContentComponent).toEqual(ApprovedContent);
      });
      it('returns RejectedContent if purchased and request is rejected', () => {
        loadHook({ purchased: true, requestStatus: statuses.rejected });
        expect(out.ContentComponent).toEqual(RejectedContent);
      });
      it('returns EligibleContent if purchased and request status is invalid', () => {
        loadHook({ purchased: true, requestStatus: 'fake-status' });
        expect(out.ContentComponent).toEqual(EligibleContent);
      });
    });
  });
});
