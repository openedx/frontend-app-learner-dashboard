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

describe('useActionDisabledState', () => {
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

  const runHook = () => hooks.useActionDisabledState(cardId);
  describe('disableBeginCourse', () => {
    const testDisabled = (data, expected) => {
      mockHooksData(data);
      expect(runHook().disableBeginCourse).toBe(expected);
    };
    it('disable when homeUrl is invalid', () => {
      testDisabled({ homeUrl: null }, true);
    });
    it('disable when isMasquerading is true', () => {
      testDisabled({ isMasquerading: true }, true);
    });
    it('disable when hasAccess is false', () => {
      testDisabled({ hasAccess: false }, true);
    });
    it('disable when isAudit is true and isAuditAccessExpired is true', () => {
      testDisabled({ isAudit: true, isAuditAccessExpired: true }, true);
    });
    it('enable when all conditions are met', () => {
      testDisabled({ hasAccess: true }, false);
    });
  });
  describe('disableResumeCourse', () => {
    const testDisabled = (data, expected) => {
      mockHooksData(data);
      expect(runHook().disableResumeCourse).toBe(expected);
    };
    it('disable when resumeUrl is invalid', () => {
      testDisabled({ resumeUrl: null }, true);
    });
    it('disable when isMasquerading is true', () => {
      testDisabled({ isMasquerading: true }, true);
    });
    it('disable when hasAccess is false', () => {
      testDisabled({ hasAccess: false }, true);
    });
    it('disable when isAudit is true and isAuditAccessExpired is true', () => {
      testDisabled({ isAudit: true, isAuditAccessExpired: true }, true);
    });
    it('enable when all conditions are met', () => {
      testDisabled({ hasAccess: true }, false);
    });
  });
  describe('disableViewCourse', () => {
    const testDisabled = (data, expected) => {
      mockHooksData(data);
      expect(runHook().disableViewCourse).toBe(expected);
    };
    it('disable when hasAccess is false', () => {
      testDisabled({ hasAccess: false }, true);
    });
    it('disable when isAudit is true and isAuditAccessExpired is true', () => {
      testDisabled({ isAudit: true, isAuditAccessExpired: true }, true);
    });
    it('enable when all conditions are met', () => {
      testDisabled({ hasAccess: true }, false);
    });
  });
  describe('disableUpgradeCourse', () => {
    const testDisabled = (data, expected) => {
      mockHooksData(data);
      expect(runHook().disableUpgradeCourse).toBe(expected);
    };
    it('disable when upgradeUrl is invalid', () => {
      testDisabled({ upgradeUrl: null }, true);
    });
    it('disable when isMasquerading is true and canUpgrade is false', () => {
      testDisabled({ isMasquerading: true, canUpgrade: false }, true);
    });
    it('enable when all conditions are met', () => {
      testDisabled({ canUpgrade: true }, false);
    });
  });
  describe('disableSelectSession', () => {
    const testDisabled = (data, expected) => {
      mockHooksData(data);
      expect(runHook().disableSelectSession).toBe(expected);
    };
    it('disable when isEntitlement is false', () => {
      testDisabled({ isEntitlement: false }, true);
    });
    it('disable when isMasquerading is true', () => {
      testDisabled({ isMasquerading: true }, true);
    });
    it('disable when hasAccess is false', () => {
      testDisabled({ hasAccess: false }, true);
    });
    it('disable when canChange is false', () => {
      testDisabled({ canChange: false }, true);
    });
    it('disable when hasSessions is false', () => {
      testDisabled({ hasSessions: false }, true);
    });
    it('enable when all conditions are met', () => {
      testDisabled(
        {
          isEntitlement: true,
          hasAccess: true,
          canChange: true,
          hasSessions: true,
        },
        false,
      );
    });
  });
  describe('disableCourseTitle', () => {
    const testDisabled = (data, expected) => {
      mockHooksData(data);
      expect(runHook().disableCourseTitle).toBe(expected);
    };
    it('disable when isEntitlement is true and isFulfilled is false', () => {
      testDisabled({ isEntitlement: true, isFulfilled: false }, true);
    });
    it('disable when disableViewCourse is true', () => {
      testDisabled({ hasAccess: false }, true);
    });
    it('enable when all conditions are met', () => {
      testDisabled({ isEntitlement: true, isFulfilled: true, hasAccess: true }, false);
    });
  });
});
