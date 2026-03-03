import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useCourseData } from 'hooks';
import { useSelectSessionModal } from 'data/context';
import * as api from 'data/services/lms/api';

import { useSelectSessionModalData } from './hooks';
import { LEAVE_OPTION } from './constants';
import messages from './messages';

jest.mock('data/services/lms/api', () => ({
  deleteEntitlementEnrollment: jest.fn(),
  updateEntitlementEnrollment: jest.fn(),
}));

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('data/context', () => ({
  useSelectSessionModal: jest.fn(),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage,
    }),
  };
});

jest.mock('@edx/frontend-platform/logging', () => ({
  ...jest.requireActual('@edx/frontend-platform/logging'),
  logError: jest.fn(),
}));

jest.mock('tracking', () => ({
  entitlements: {
    newSession: jest.fn(() => jest.fn()),
    switchSession: jest.fn(() => jest.fn()),
    leaveSession: jest.fn(() => jest.fn()),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  return wrapper;
};

const selectedCardId = 'test-selected-card-id';
const courseTitle = 'Test Course';
const courseId = 'course-123';
const uuid = 'entitlement-uuid';

const courseData = {
  entitlement: {
    availableSessions: [
      { startDate: '2024-01-01', endDate: '2024-06-01', cardId: 'session-1' },
      { startDate: '2024-07-01', endDate: '2024-12-01', cardId: 'session-2' },
    ],
    isFulfilled: false,
    uuid,
    isRefundable: true,
  },
  course: {
    title: courseTitle,
  },
  courseRun: {
    courseId,
  },
  enrollment: {
    isEnrolled: false,
  },
};

const closeSelectSessionModal = jest.fn();

describe('SelectSessionModal hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCourseData.mockReturnValue(courseData);
    useSelectSessionModal.mockReturnValue({
      selectSessionModal: { cardId: selectedCardId },
      closeSelectSessionModal,
    });
    api.deleteEntitlementEnrollment.mockResolvedValue({});
    api.updateEntitlementEnrollment.mockResolvedValue({});
  });

  describe('useSelectSessionModalData', () => {
    it('loads data based on selected card id', () => {
      renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(useCourseData).toHaveBeenCalledWith(selectedCardId);
    });

    it('initializes selectedSession with courseId if available', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.selectedSession).toBe(courseId);
    });

    it('initializes selectedSession with null if courseId not available', () => {
      useCourseData.mockReturnValue({
        ...courseData,
        courseRun: { courseId: null },
      });

      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.selectedSession).toBe(null);
    });

    it('sets selected session with event target value', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.handleSelection({ target: { value: 'new-session-id' } });
      });

      expect(result.current.selectedSession).toBe('new-session-id');
    });

    it('calls deleteEntitlementEnrollment api when LEAVE_OPTION is selected', async () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.handleSelection({ target: { value: LEAVE_OPTION } });
      });

      await act(async () => {
        result.current.handleSubmit();
      });

      expect(api.deleteEntitlementEnrollment).toHaveBeenCalledWith({
        uuid,
        isRefundable: true,
      });
    });

    it('calls switchEntitlementEnrollment api when not enrolled and selecting session', async () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.handleSelection({ target: { value: 'new-session-id' } });
      });

      await act(async () => {
        result.current.handleSubmit();
      });

      expect(api.updateEntitlementEnrollment).toHaveBeenCalledWith({
        uuid,
        courseId: 'new-session-id',
      });
    });

    it('calls updateEntitlementEnrollment api when enrolled and switching sessions', async () => {
      const enrolledCourseData = {
        ...courseData,
        enrollment: { isEnrolled: true },
        courseRun: { courseId: 'current-session-id' },
      };

      useCourseData.mockReturnValue(enrolledCourseData);

      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.handleSelection({ target: { value: 'new-session-id' } });
      });

      await act(async () => {
        result.current.handleSubmit();
      });

      expect(api.updateEntitlementEnrollment).toHaveBeenCalledWith({
        uuid,
        courseId: 'new-session-id',
      });
    });

    it('shows modal when selectedCardId is not null', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.showModal).toBe(true);
    });

    it('hides modal when selectedCardId is null', () => {
      useSelectSessionModal.mockReturnValue({
        selectSessionModal: { cardId: null },
        closeSelectSessionModal,
      });

      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.showModal).toBe(false);
    });

    it('displays select session header and hint when unfulfilled', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });
      const { formatMessage } = useIntl();

      expect(result.current.header).toBe(formatMessage(messages.selectSessionHeader, { courseTitle }));
      expect(result.current.hint).toBe(formatMessage(messages.selectSessionHint));
    });

    it('displays change or leave header and hint when fulfilled', () => {
      useCourseData.mockReturnValue({
        ...courseData,
        entitlement: {
          ...courseData.entitlement,
          isFulfilled: true,
        },
      });

      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });
      const { formatMessage } = useIntl();

      expect(result.current.header).toBe(formatMessage(messages.changeOrLeaveHeader));
      expect(result.current.hint).toBe(formatMessage(messages.changeOrLeaveHint));
    });

    it('shows leave option when entitlement is fulfilled', () => {
      useCourseData.mockReturnValue({
        ...courseData,
        entitlement: {
          ...courseData.entitlement,
          isFulfilled: true,
        },
      });

      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.showLeaveOption).toBe(true);
    });

    it('hides leave option when entitlement is not fulfilled', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.showLeaveOption).toBe(false);
    });

    it('returns available sessions from entitlement data', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.availableSessions).toEqual(courseData.entitlement.availableSessions);
    });

    it('closes session modal when closeSessionModal is called', () => {
      const { result } = renderHook(() => useSelectSessionModalData(), {
        wrapper: createWrapper(),
      });

      result.current.closeSessionModal();

      expect(closeSelectSessionModal).toHaveBeenCalled();
    });
  });
});
