import { useCourseData } from 'hooks';
import { useIsMasquerading } from 'hooks/useIsMasquerading';
import * as hooks from './hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: jest.fn((fn) => fn()),
}));

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('hooks/useIsMasquerading', () => ({
  useIsMasquerading: jest.fn(),
}));

const cardId = 'my-test-course-number';

describe('useActionDisabledState', () => {
  const defaultData = {
    isMasquerading: false,
    isEntitlement: false,
    isFulfilled: false,
    canChange: false,
    hasSessions: false,
    hasAccess: false,
    isAudit: false,
    isAuditAccessExpired: false,
    resumeUrl: 'resume.url',
    homeUrl: 'home.url',
  };
  const mockHooksData = (args) => {
    const {
      isMasquerading,
      isEntitlement,
      isFulfilled,
      canChange,
      hasSessions,
      hasAccess,
      isAudit,
      isAuditAccessExpired,
      resumeUrl,
      homeUrl,
      availableSessions,
    } = { ...defaultData, ...args };
    useIsMasquerading.mockReturnValue(isMasquerading);
    useCourseData.mockReturnValue({
      enrollment: {
        hasAccess,
        isAudit,
        isAuditAccessExpired,
        coursewareAccess: {
          isStaff: false,
          hasUnmetPrereqs: !hasAccess,
          isTooEarly: !hasAccess,
        },
      },
      entitlement: isEntitlement ? {
        isEntitlement: true,
        isFulfilled,
        canChange,
        hasSessions,
        availableSessions,
      } : {},
      courseRun: {
        resumeUrl,
        homeUrl,
      },
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
          availableSessions: ['session1'],
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
