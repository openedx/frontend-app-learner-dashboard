import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCourseData } from 'hooks';
import * as api from 'data/services/lms/api';

import { useEmailData } from './hooks';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(() => ({
    enrollment: {},
  })),
}));

jest.mock('data/services/lms/api', () => ({
  updateEmailSettings: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  return wrapper;
};

const cardId = 'my-test-course-number';
const closeModal = jest.fn();

describe('EmailSettingsModal hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useEmailData', () => {
    it('loads enrollment data based on course number', () => {
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: true } });

      renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      expect(useCourseData).toHaveBeenCalledWith(cardId);
    });

    it('initializes toggle value to cardData.hasOptedOutOfEmail when true', () => {
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: true } });

      const { result } = renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isOptedOut).toEqual(true);
    });

    it('initializes toggle value to cardData.hasOptedOutOfEmail when false', () => {
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: false } });

      const { result } = renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isOptedOut).toEqual(false);
    });

    it('initializes toggle value to false when hasOptedOutOfEmail is undefined', () => {
      useCourseData.mockReturnValue({ enrollment: {} });

      const { result } = renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isOptedOut).toEqual(false);
    });

    it('toggles state value when onToggle is called', () => {
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: true } });

      const { result } = renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isOptedOut).toEqual(true);

      act(() => {
        result.current.onToggle();
      });

      expect(result.current.isOptedOut).toEqual(false);

      act(() => {
        result.current.onToggle();
      });

      expect(result.current.isOptedOut).toEqual(true);
    });

    it('calls updateEmailSettings api and closeModal when save is called', async () => {
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: true } });
      api.updateEmailSettings.mockResolvedValue({});

      const { result } = renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.save();
      });

      const expectedArg = { courseId: cardId, enable: !result.current.isOptedOut };
      expect(api.updateEmailSettings).toHaveBeenCalledWith(expectedArg);
      expect(closeModal).toHaveBeenCalled();
    });

    it('calls updateEmailSettings with enable:true when isOptedOut is false', async () => {
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: false } });
      api.updateEmailSettings.mockResolvedValue({});

      const { result } = renderHook(() => useEmailData({ closeModal, cardId }), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.save();
      });

      expect(api.updateEmailSettings).toHaveBeenCalledWith({
        courseId: cardId,
        enable: true,
      });
    });
  });
});
