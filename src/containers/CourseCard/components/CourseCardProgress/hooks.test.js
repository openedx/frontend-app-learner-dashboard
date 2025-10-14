import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import { reduxHooks } from 'hooks';
import { useCardProgressData, useProgressVariant } from './hooks';

jest.mock('@edx/frontend-platform/i18n');
jest.mock('@edx/frontend-platform');
jest.mock('hooks', () => ({
  reduxHooks: {
    useCardEnrollmentData: jest.fn(),
  },
}));

const cardId = 'test-card-id';

describe('CourseCardProgress hooks', () => {
  const mockFormatMessage = jest.fn((message) => message.defaultMessage);

  beforeEach() {
    useIntl.mockReturnValue({ formatMessage: mockFormatMessage });
    getConfig.mockReturnValue({ SHOW_PROGRESS_BAR: true });
    reduxHooks.useCardEnrollmentData.mockReturnValue({ isEnrolled: true });
  });

  describe('useProgressVariant', () => {
    it('returns success for progress >= 75', () => {
      expect(useProgressVariant({ progress: 75 })).toBe('success');
      expect(useProgressVariant({ progress: 100 })).toBe('success');
    });

    it('returns warning for progress >= 50 and < 75', () => {
      expect(useProgressVariant({ progress: 50 })).toBe('warning');
      expect(useProgressVariant({ progress: 60 })).toBe('warning');
    });

    it('returns info for progress < 50', () => {
      expect(useProgressVariant({ progress: 0 })).toBe('info');
      expect(useProgressVariant({ progress: 25 })).toBe('info');
    });
  });

  describe('useCardProgressData', () => {
    it('returns shouldRender false when feature flag is disabled', () => {
      getConfig.mockReturnValue({ SHOW_PROGRESS_BAR: false });

      const result = useCardProgressData({ cardId });

      expect(result.shouldRender).toBe(false);
    });

    it('returns shouldRender false when user is not enrolled', () => {
      reduxHooks.useCardEnrollmentData.mockReturnValue({ isEnrolled: false });

      const result = useCardProgressData({ cardId });

      expect(result.shouldRender).toBe(false);
    });

    it('returns shouldRender true when feature flag is enabled and user is enrolled', () => {
      const result = useCardProgressData({ cardId });

      expect(result.shouldRender).toBe(true);
    });
  });
});