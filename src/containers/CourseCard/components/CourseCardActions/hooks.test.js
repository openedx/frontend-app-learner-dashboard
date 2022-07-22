import { Locked } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';

import messages from './messages';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

const courseNumber = 'my-test-course-number';

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

describe('CourseCardActions hooks', () => {
  let out;
  const { formatMessage } = useIntl();
  const runHook = (overrides = {}) => {
    const { enrollment = {}, courseRun = {} } = overrides;
    appHooks.useCardCourseRunData.mockReturnValueOnce({ ...courseRunData, ...courseRun });
    appHooks.useCardEnrollmentData.mockReturnValueOnce({ ...enrollmentData, ...enrollment });
    out = hooks.useCardActionData({ courseNumber });
  };
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
