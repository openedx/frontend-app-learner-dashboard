import { useDispatch } from 'react-redux';
import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';

import messages from './messages';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementsData: jest.fn(),
    useUpdateSelectSessionModalCallback: jest.fn(
      (...args) => ({ updateSelectSessionModalCallback: args }),
    ),
  },
}));

const cardId = 'my-test-course-number';

const enrollmentData = {
  canUpgrade: false,
  isAudit: true,
  isAuditAccessExpired: false,
  isVerified: false,
};
const courseRunData = {
  isPending: false,
  isArchived: false,
};
const entitlementData = {
  isEntitlement: false,
  canViewCourse: false,
  isFulfilled: false,
  isExpired: false,
  canChange: false,
  hasSessions: false,
};

const dispatch = useDispatch();

describe('CourseCardActions hooks', () => {
  let out;
  const { formatMessage } = useIntl();
  const runHook = (overrides = {}) => {
    const { enrollment = {}, courseRun = {}, entitlement = {} } = overrides;
    appHooks.useCardCourseRunData.mockReturnValueOnce({ ...courseRunData, ...courseRun });
    appHooks.useCardEnrollmentData.mockReturnValueOnce({ ...enrollmentData, ...enrollment });
    appHooks.useCardEntitlementsData.mockReturnValueOnce({ ...entitlementData, ...entitlement });
    out = hooks.useCardActionData({ cardId });
  };
  describe('behavior', () => {
    beforeEach(() => {
      runHook();
    });
    it('initializes courseRun data with cardId', () => {
      expect(appHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
    });
    it('initializes Enrollment data with cardId', () => {
      expect(appHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
    });
    it('initializes Entitlements data with cardId', () => {
      expect(appHooks.useCardEntitlementsData).toHaveBeenCalledWith(cardId);
    });
    it('initializes SelectSession data with dispatch and cardId', () => {
      expect(appHooks.useUpdateSelectSessionModalCallback).toHaveBeenCalledWith(dispatch, cardId);
    });
  });
  describe('entitlement', () => {
    describe('secondary action', () => {
      it('return null on entitlement course', () => {
        runHook({ entitlement: { isEntitlement: true } });
        expect(out.secondary).toEqual(null);
      });
    });
    describe('primary action', () => {
      describe('unfulfilled entitlment', () => {
        it('has select session text', () => {
          runHook({ entitlement: { isEntitlement: true, isFulfilled: false } });
          expect(out.primary.children).toEqual(formatMessage(messages.selectSession));
        });
        it('disabled when it cannot change or does not have sessions', () => {
          runHook({
            entitlement: {
              isEntitlement: true,
              isFulfilled: false,
              canChange: false,
              hasSessions: true,
            },
          });
          expect(out.primary.disabled).toEqual(true);
          runHook({
            entitlement: {
              isEntitlement: true,
              isFulfilled: false,
              canChange: true,
              hasSessions: false,
            },
          });
          expect(out.primary.disabled).toEqual(true);
        });
        it('calls updateSelectSessionModalCallback on click', () => {
          runHook({ entitlement: { isEntitlement: true, isFulfilled: false } });
          expect(out.primary.onClick).toEqual(appHooks.useUpdateSelectSessionModalCallback(dispatch, cardId));
        });
      });

      describe('fulfilled entitlment', () => {
        it('has View Course text', () => {
          runHook({ entitlement: { isEntitlement: true, isFulfilled: true } });
          expect(out.primary.children).toEqual(formatMessage(messages.viewCourse));
        });
        it('disabled when it is expired and cannot View Course', () => {
          runHook({
            entitlement: {
              isEntitlement: true,
              isFulfilled: true,
              isExpired: true,
              canViewCourse: false,
            },
          });
          expect(out.primary.disabled).toEqual(true);
        });
      });
    });
  });
  describe('enrollment', () => {
    describe('secondary action', () => {
      it('returns null if verified', () => {
        runHook({ enrollment: { isAudit: false, isVerified: true } });
        expect(out.secondary).toEqual(null);
      });
      it('returns disabled upgrade button if audit, but cannot upgrade', () => {
        runHook();
        expect(out.secondary).toEqual({
          iconBefore: Locked,
          variant: 'outline-primary',
          disabled: true,
          children: formatMessage(messages.upgrade),
        });
      });
      it('returns enabled upgrade button if audit and can upgrade', () => {
        runHook({ enrollment: { canUpgrade: true } });
        expect(out.secondary).toEqual({
          iconBefore: Locked,
          variant: 'outline-primary',
          disabled: false,
          children: formatMessage(messages.upgrade),
        });
      });
    });
    describe('primary action', () => {
      it('returns Begin Course button if pending', () => {
        runHook({ courseRun: { isPending: true } });
        expect(out.primary).toEqual({ children: formatMessage(messages.beginCourse) });
      });
      it('returns enabled Resume button if active, and not audit with expired access', () => {
        runHook({ enrollment: { isAuditAccessExpired: true } });
        expect(out.primary).toEqual({
          children: formatMessage(messages.resume),
          disabled: true,
        });
      });
      it('returns disabled Resume button if active and audit without expired access', () => {
        runHook();
        expect(out.primary).toEqual({
          children: formatMessage(messages.resume),
          disabled: false,
        });
        runHook({ enrollment: { isAudit: false, isVerified: true } });
        expect(out.primary).toEqual({
          children: formatMessage(messages.resume),
          disabled: false,
        });
      });
      it('returns viewCourse button if archived', () => {
        runHook({ courseRun: { isArchived: true } });
        expect(out.primary).toEqual({
          children: formatMessage(messages.viewCourse),
        });
      });
    });
  });
});
