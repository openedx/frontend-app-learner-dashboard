import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import track from 'tracking';
import {
  useCourseData,
  useCourseTrackingEvent,
  useEntitlementInfo,
} from 'hooks';
import * as api from 'data/services/lms/api';

import { useUnenrollReasons } from './reasons';
import constants from '../constants';

jest.mock('data/services/lms/api', () => ({
  unenrollFromCourse: jest.fn(),
}));

jest.mock('hooks', () => ({
  useCourseTrackingEvent: jest.fn(),
  useCourseData: jest.fn(),
  useEntitlementInfo: jest.fn(),
  utilHooks: {
    useValueCallback: jest.fn((cb) => cb),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  return wrapper;
};

const cardId = 'test-card-id';
const courseData = { courseRun: { courseId: cardId } };
const trackCourseEvent = jest.fn();

describe('UnenrollConfirmModal reasons hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCourseData.mockReturnValue(courseData);
    useCourseTrackingEvent.mockReturnValue(trackCourseEvent);
    useEntitlementInfo.mockReturnValue({ isEntitlement: false });
    api.unenrollFromCourse.mockResolvedValue({});
  });

  describe('useUnenrollReasons', () => {
    it('initializes selectedReason with preferNotToSay constant', () => {
      const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.submittedReason).toBe(constants.reasonKeys.preferNotToSay);
    });

    it('initializes customOption with empty string', () => {
      const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.customOption.value).toBe('');
    });

    it('initializes isSubmitted with false', () => {
      const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSubmitted).toBe(false);
    });

    it('passes custom option as track event value when selectedReason is custom', () => {
      const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.selectOption('custom');
      });

      act(() => {
        result.current.customOption.onChange('test-custom-value');
      });

      renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      expect(useCourseTrackingEvent).toHaveBeenCalledWith(
        track.engagement.unenrollReason,
        cardId,
        'test-custom-value',
        false,
      );
    });

    it('passes selected reason as track event value when not custom with entitlement', () => {
      useEntitlementInfo.mockReturnValue({ isEntitlement: true });

      const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.selectOption('test-reason');
      });

      renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      expect(useCourseTrackingEvent).toHaveBeenCalledWith(
        track.engagement.unenrollReason,
        cardId,
        'test-reason',
        true,
      );
    });

    it('initializes card entitlement data with courseData', () => {
      renderHook(() => useUnenrollReasons({ cardId }), {
        wrapper: createWrapper(),
      });

      expect(useEntitlementInfo).toHaveBeenCalledWith(courseData);
    });

    describe('customOption', () => {
      it('returns current custom option value', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.customOption.onChange('test-value');
        });

        expect(result.current.customOption.value).toBe('test-value');
      });
    });

    describe('hasReason', () => {
      it('returns true if an option is selected other than custom', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.selectOption('test-value');
        });

        expect(result.current.hasReason).toBe(true);
      });

      it('returns true if custom option is selected and provided', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.selectOption('custom');
        });

        act(() => {
          result.current.customOption.onChange('test-value2');
        });

        expect(result.current.hasReason).toBe(true);
      });

      it('returns false if no option is selected', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.selectOption(null);
        });

        expect(result.current.hasReason).toBe(false);
      });

      it('returns false if custom option is selected but not provided', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.selectOption('custom');
        });

        expect(result.current.hasReason).toBe(false);
      });
    });

    describe('handleClear method', () => {
      it('resets selected reason, custom option and isSubmitted', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.selectOption('test-reason');
        });

        act(() => {
          result.current.customOption.onChange('test-value');
        });

        act(() => {
          result.current.handleClear();
        });

        expect(result.current.submittedReason).toBeNull();
        expect(result.current.customOption.value).toBe('');
        expect(result.current.isSubmitted).toBe(false);
      });
    });

    describe('handleSubmit', () => {
      it('tracks reason event and calls unenroll api', async () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        const event = { test: 'event' };

        await act(async () => {
          result.current.handleSubmit(event);
        });

        expect(trackCourseEvent).toHaveBeenCalledWith(event);
        expect(api.unenrollFromCourse).toHaveBeenCalledWith({ courseId: cardId });
      });
    });

    describe('submittedReason', () => {
      it('returns the selected reason unless is custom, then shows custom option', () => {
        const { result } = renderHook(() => useUnenrollReasons({ cardId }), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.selectOption('test-value');
        });

        act(() => {
          result.current.customOption.onChange('test-value2');
        });

        expect(result.current.submittedReason).toBe('test-value');

        act(() => {
          result.current.selectOption('custom');
        });

        expect(result.current.submittedReason).toBe('test-value2');
      });
    });
  });
});
