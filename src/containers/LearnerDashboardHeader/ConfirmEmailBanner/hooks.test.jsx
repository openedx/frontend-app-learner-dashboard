import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInitializeLearnerHome } from 'data/hooks';
import * as api from 'data/services/lms/api';
import * as hooks from './hooks';

jest.mock('data/hooks', () => ({
  ...jest.requireActual('data/hooks'),
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('data/services/lms/api', () => ({
  sendConfirmEmail: jest.fn(),
}));

const emailConfirmation = {
  isNeeded: true,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  return wrapper;
};

describe('ConfirmEmailBanner hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.sendConfirmEmail.mockResolvedValue({});
  });

  describe('useEmailConfirmationData', () => {
    it('show page banner on unverified email', () => {
      useInitializeLearnerHome.mockReturnValue({ data: { emailConfirmation: { ...emailConfirmation } } });

      const { result } = renderHook(() => hooks.useConfirmEmailBannerData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isNeeded).toEqual(emailConfirmation.isNeeded);
    });

    it('hide page banner on verified email', () => {
      useInitializeLearnerHome.mockReturnValue({ data: { emailConfirmation: { isNeeded: false } } });

      const { result } = renderHook(() => hooks.useConfirmEmailBannerData(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isNeeded).toEqual(false);
    });
  });

  describe('behavior', () => {
    beforeEach(() => {
      useInitializeLearnerHome.mockReturnValue({ data: { emailConfirmation: { ...emailConfirmation } } });
    });

    it('closePageBanner', () => {
      const { result } = renderHook(() => hooks.useConfirmEmailBannerData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.closePageBanner();
      });

      expect(result.current.showPageBanner).toEqual(false);
    });

    it('closeConfirmModal', () => {
      const { result } = renderHook(() => hooks.useConfirmEmailBannerData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.closeConfirmModal();
      });

      expect(result.current.showConfirmModal).toEqual(false);
    });

    it('openConfirmModalButtonClick', async () => {
      const { result } = renderHook(() => hooks.useConfirmEmailBannerData(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        result.current.openConfirmModalButtonClick();
      });

      expect(result.current.showConfirmModal).toEqual(true);
      expect(api.sendConfirmEmail).toHaveBeenCalled();
    });

    it('userConfirmEmailButtonClick', () => {
      const { result } = renderHook(() => hooks.useConfirmEmailBannerData(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.userConfirmEmailButtonClick();
      });

      expect(result.current.showConfirmModal).toEqual(false);
      expect(result.current.showPageBanner).toEqual(false);
    });
  });
});
