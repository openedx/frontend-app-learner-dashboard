import { reduxHooks } from 'hooks';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useMasqueradeData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useCardCourseRunData: jest.fn(),
  },
}));

const cardId = 'my-test-course-number';

describe('useCardActionData', () => {
  const defaultData = {
    isMasquerading: false,
    canUpgrade: false,
    isEntitlement: false,
    isFulfilled: false,
    canChange: false,
    hasSessions: false,
    hasAccess: false,
    isAudit: false,
    isAuditAccessExpired: false,
    resumeUrl: 'resume.url',
    homeUrl: 'home.url',
    upgradeUrl: 'upgrade.url',
  };
  const mockHooksData = (args) => {
    const {
      isMasquerading,
      canUpgrade,
      isEntitlement,
      isFulfilled,
      canChange,
      hasSessions,
      hasAccess,
      isAudit,
      isAuditAccessExpired,
      resumeUrl,
      homeUrl,
      upgradeUrl,
    } = { ...defaultData, ...args };
    reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading });
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({
      canUpgrade,
      hasAccess,
      isAudit,
      isAuditAccessExpired,
    });
    reduxHooks.useCardEntitlementData.mockReturnValueOnce({
      isEntitlement,
      isFulfilled,
      canChange,
      hasSessions,
    });
    reduxHooks.useCardCourseRunData.mockReturnValueOnce({
      resumeUrl,
      homeUrl,
      upgradeUrl,
    });
  };

  describe('disableBeginCourse', () => {
    it('disable when homeUrl is invalid', () => {
      mockHooksData({ homeUrl: null });
      const { disableBeginCourse } = hooks.useCardActionData(cardId);
      expect(disableBeginCourse).toBe(true);
    });
    it('disable when isMasquerading is true', () => {
      mockHooksData({ isMasquerading: true });
      const { disableBeginCourse } = hooks.useCardActionData(cardId);
      expect(disableBeginCourse).toBe(true);
    });
    it('disable when hasAccess is false', () => {
      mockHooksData({ hasAccess: false });
      const { disableBeginCourse } = hooks.useCardActionData(cardId);
      expect(disableBeginCourse).toBe(true);
    });
    it('disable when isAudit is true and isAuditAccessExpired is true', () => {
      mockHooksData({ isAudit: true, isAuditAccessExpired: true });
      const { disableBeginCourse } = hooks.useCardActionData(cardId);
      expect(disableBeginCourse).toBe(true);
    });
    it('enable when all conditions are met', () => {
      mockHooksData({ hasAccess: true });
      const { disableBeginCourse } = hooks.useCardActionData(cardId);
      expect(disableBeginCourse).toBe(false);
    });
  });
  describe('disableResumeCourse', () => {
    it('disable when resumeUrl is invalid', () => {
      mockHooksData({ resumeUrl: null });
      const { disableResumeCourse } = hooks.useCardActionData(cardId);
      expect(disableResumeCourse).toBe(true);
    });
    it('disable when isMasquerading is true', () => {
      mockHooksData({ isMasquerading: true });
      const { disableResumeCourse } = hooks.useCardActionData(cardId);
      expect(disableResumeCourse).toBe(true);
    });
    it('disable when hasAccess is false', () => {
      mockHooksData({ hasAccess: false });
      const { disableResumeCourse } = hooks.useCardActionData(cardId);
      expect(disableResumeCourse).toBe(true);
    });
    it('disable when isAudit is true and isAuditAccessExpired is true', () => {
      mockHooksData({ isAudit: true, isAuditAccessExpired: true });
      const { disableResumeCourse } = hooks.useCardActionData(cardId);
      expect(disableResumeCourse).toBe(true);
    });
    it('enable when all conditions are met', () => {
      mockHooksData({ hasAccess: true });
      const { disableResumeCourse } = hooks.useCardActionData(cardId);
      expect(disableResumeCourse).toBe(false);
    });
  });
  describe('disableViewCourse', () => {
    it('disable when hasAccess is false', () => {
      mockHooksData({ hasAccess: false });
      const { disableViewCourse } = hooks.useCardActionData(cardId);
      expect(disableViewCourse).toBe(true);
    });
    it('disable when isAudit is true and isAuditAccessExpired is true', () => {
      mockHooksData({ isAudit: true, isAuditAccessExpired: true });
      const { disableViewCourse } = hooks.useCardActionData(cardId);
      expect(disableViewCourse).toBe(true);
    });
    it('enable when all conditions are met', () => {
      mockHooksData({ hasAccess: true });
      const { disableViewCourse } = hooks.useCardActionData(cardId);
      expect(disableViewCourse).toBe(false);
    });
  });
  describe('disableUpgradeCourse', () => {
    it('disable when upgradeUrl is invalid', () => {
      mockHooksData({ upgradeUrl: null });
      const { disableUpgradeCourse } = hooks.useCardActionData(cardId);
      expect(disableUpgradeCourse).toBe(true);
    });
    it('disable when isMasquerading is true and canUpgrade is false', () => {
      mockHooksData({ isMasquerading: true, canUpgrade: false });
      const { disableUpgradeCourse } = hooks.useCardActionData(cardId);
      expect(disableUpgradeCourse).toBe(true);
    });
    it('enable when all conditions are met', () => {
      mockHooksData({ canUpgrade: true });
      const { disableUpgradeCourse } = hooks.useCardActionData(cardId);
      expect(disableUpgradeCourse).toBe(false);
    });
  });
  describe('disableSelectSession', () => {
    it('disable when isEntitlement is false', () => {
      mockHooksData({ isEntitlement: false });
      const { disableSelectSession } = hooks.useCardActionData(cardId);
      expect(disableSelectSession).toBe(true);
    });
    it('disable when isMasquerading is true', () => {
      mockHooksData({ isMasquerading: true });
      const { disableSelectSession } = hooks.useCardActionData(cardId);
      expect(disableSelectSession).toBe(true);
    });
    it('disable when hasAccess is false', () => {
      mockHooksData({ hasAccess: false });
      const { disableSelectSession } = hooks.useCardActionData(cardId);
      expect(disableSelectSession).toBe(true);
    });
    it('disable when canChange is false', () => {
      mockHooksData({ canChange: false });
      const { disableSelectSession } = hooks.useCardActionData(cardId);
      expect(disableSelectSession).toBe(true);
    });
    it('disable when hasSessions is false', () => {
      mockHooksData({ hasSessions: false });
      const { disableSelectSession } = hooks.useCardActionData(cardId);
      expect(disableSelectSession).toBe(true);
    });
    it('enable when all conditions are met', () => {
      mockHooksData({
        isEntitlement: true, hasAccess: true, canChange: true, hasSessions: true,
      });
      const { disableSelectSession } = hooks.useCardActionData(cardId);
      expect(disableSelectSession).toBe(false);
    });
  });
  describe('disableCourseTitle', () => {
    it('disable when isEntitlement is true and isFulfilled is false', () => {
      mockHooksData({ isEntitlement: true, isFulfilled: false });
      const { disableCourseTitle } = hooks.useCardActionData(cardId);
      expect(disableCourseTitle).toBe(true);
    });
    it('disable when disableViewCourse is true', () => {
      mockHooksData({ hasAccess: false });
      const { disableCourseTitle } = hooks.useCardActionData(cardId);
      expect(disableCourseTitle).toBe(true);
    });
    it('enable when all conditions are met', () => {
      mockHooksData({ isEntitlement: true, isFulfilled: true, hasAccess: true });
      const { disableCourseTitle } = hooks.useCardActionData(cardId);
      expect(disableCourseTitle).toBe(false);
    });
  });
});
