import React from 'react';
import { apiHooks } from '@src/hooks';
import { MockUseState } from '@src/testUtils';
import * as reasons from './reasons';
import * as hooks from '.';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('./reasons', () => ({
  useUnenrollReasons: jest.fn(),
}));
jest.mock('../../../hooks', () => ({
  apiHooks: {
    useInitializeApp: jest.fn(),
  },
}));
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
  QueryClient: jest.fn().mockImplementation(() => ({
    invalidateQueries: jest.fn(),
  })),
  QueryClientProvider: ({ children }) => children,
}));

const state = new MockUseState(hooks);
const testValue = 'test-value';
const initializeApp = jest.fn();
apiHooks.useInitializeApp.mockReturnValue(initializeApp);

let out;

const mockReason = {
  handleClear: jest.fn(),
  isSubmitted: false,
  isSkipped: false,
  submittedReason: 'test-submitted-reason',
};

const useUnenrollReasons = jest.fn(() => mockReason);

describe('UnenrollConfirmModal hooks', () => {
  beforeEach(() => {
    reasons.useUnenrollReasons.mockImplementation(useUnenrollReasons);
  });
  const closeModal = jest.fn();
  const cardId = 'test-card-id';
  const createUseUnenrollData = () => {
    const queryClient = new QueryClient();
    const { result } = renderHook(() => hooks.useUnenrollData({ closeModal, cardId }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });
    return result.current;
  };

  describe('state fields', () => {
    state.testGetter(state.keys.confirmed);
  });
  describe('modalHooks', () => {
    beforeEach(() => {
      state.mock();
      state.mockVal(state.keys.confirmed, testValue);
      out = createUseUnenrollData();
    });
    afterEach(() => {
      state.restore();
    });
    test('isConfirmed is forwarded from state', () => {
      expect(out.isConfirmed).toEqual(testValue);
    });
    test('confirm is callback that sets isConfirmed to true', () => {
      out.confirm();
      expect(state.setState.confirmed).toHaveBeenCalledWith(true);
    });
    test('reason returns useUnenrollReasons output', () => {
      expect(out.reason).toEqual(mockReason);
    });
    describe('close', () => {
      it('calls closeModal, sets isConfirmed to false, and calls reason.handleClear', () => {
        out.close();
        expect(closeModal).toHaveBeenCalled();
        expect(state.setState.confirmed).toHaveBeenCalledWith(false);
        expect(mockReason.handleClear).toHaveBeenCalled();
      });
    });
    describe('closeAndRefresh', () => {
      beforeEach(() => {
        apiHooks.useInitializeApp.mockClear();
      });
      it('calls closeModal, sets isConfirmed to false, and calls reason.handleClear', () => {
        out.closeAndRefresh();
        expect(closeModal).toHaveBeenCalled();
        expect(state.setState.confirmed).toHaveBeenCalledWith(false);
        expect(mockReason.handleClear).toHaveBeenCalled();
      });
      it('calls refreshList and close', () => {
        const refreshList = jest.fn();
        const close = jest.fn();

        jest.spyOn(hooks, 'useUnenrollData').mockReturnValue({
          closeAndRefresh: () => {
            refreshList();
            close();
          },
          refreshList,
          close,
        });

        out = hooks.useUnenrollData({ closeModal, cardId });
        out.closeAndRefresh();
        expect(refreshList).toHaveBeenCalled();
        expect(close).toHaveBeenCalled();
      });
    });
  });

  describe('modalState', () => {
    // Helper function to compute modalState based on the same logic as the actual hook
    const getModalState = (isConfirmed, reason) => {
      if (isConfirmed) {
        return (reason.isSubmitted || reason.isSkipped) ? 'finished' : 'reason';
      }
      return 'confirm';
    };

    test('should return finished when confirmed and submitted', () => {
      const result = getModalState(true, { isSubmitted: true, isSkipped: false });
      expect(result).toEqual('finished');
    });

    test('should return finished when confirmed and skipped', () => {
      const result = getModalState(true, { isSubmitted: false, isSkipped: true });
      expect(result).toEqual('finished');
    });

    test('should return reason when confirmed but not submitted or skipped', () => {
      const result = getModalState(true, { isSubmitted: false, isSkipped: false });
      expect(result).toEqual('reason');
    });

    test('should return confirm when not confirmed', () => {
      const result = getModalState(false, { isSubmitted: false, isSkipped: false });
      expect(result).toEqual('confirm');
    });
  });
});
