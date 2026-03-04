import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import * as api from '@src/data/services/lms/api';
import { useCourseData } from '@src/hooks';
import { useAuthenticatedUser } from '@openedx/frontend-base';
import * as hooks from './hooks';

jest.mock('@src/data/services/lms/api', () => ({
  createCreditRequest: jest.fn(),
}));

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  logError: jest.fn(),
  useAuthenticatedUser: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  return wrapper;
};

describe('useCreditRequestData', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
    (useAuthenticatedUser as jest.Mock).mockReturnValue({ username: 'test-user' });
    (useCourseData as jest.Mock).mockReturnValue({
      credit: { providerId: 'provider-123' },
      courseRun: { courseId: 'course-456' },
    });
    jest.clearAllMocks();
  });

  it('initializes requestData as null', () => {
    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    expect(result.current.requestData).toBeNull();
  });

  it('returns createCreditRequest function', () => {
    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    expect(typeof result.current.createCreditRequest).toBe('function');
  });

  it('prevents default event behavior', async () => {
    const event = { preventDefault: jest.fn() };
    (api.createCreditRequest as jest.Mock).mockResolvedValue({ data: 'success' });

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('calls API with correct parameters', async () => {
    const event = { preventDefault: jest.fn() };
    (api.createCreditRequest as jest.Mock).mockResolvedValue({ data: 'success' });

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    expect(api.createCreditRequest).toHaveBeenCalledWith({
      providerId: 'provider-123',
      courseId: 'course-456',
      username: 'test-user',
    });
  });

  it('sets requestData with response data on success', async () => {
    const event = { preventDefault: jest.fn() };
    const responseData = { data: { id: 'credit-123', status: 'pending' } };
    (api.createCreditRequest as jest.Mock).mockResolvedValue(responseData);

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    expect(api.createCreditRequest).toHaveBeenCalledWith({
      providerId: 'provider-123',
      courseId: 'course-456',
      username: 'test-user',
    });

    await waitFor(() => {
      expect(result.current.requestData).toEqual(responseData.data);
    });
  });

  it('handles missing providerId gracefully', async () => {
    const event = { preventDefault: jest.fn() };
    (useCourseData as jest.Mock).mockReturnValue({
      credit: null,
      courseRun: { courseId: 'course-456' },
    });

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    expect(api.createCreditRequest).toHaveBeenCalledWith({
      providerId: undefined,
      courseId: 'course-456',
      username: 'test-user',
    });
  });

  it('handles missing courseId gracefully', async () => {
    const event = { preventDefault: jest.fn() };
    (useCourseData as jest.Mock).mockReturnValue({
      credit: { providerId: 'provider-123' },
      courseRun: null,
    });

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    expect(api.createCreditRequest).toHaveBeenCalledWith({
      providerId: 'provider-123',
      courseId: undefined,
      username: 'test-user',
    });
  });

  it('handles API errors without crashing', async () => {
    const event = { preventDefault: jest.fn() };
    (api.createCreditRequest as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    expect(result.current.requestData).toBeNull();
  });

  it('uses cardId to fetch course data', () => {
    renderHook(() => hooks.useCreditRequestData('different-card'), { wrapper });

    expect(useCourseData).toHaveBeenCalledWith('different-card');
  });

  it('handles undefined response data', async () => {
    const event = { preventDefault: jest.fn() };
    (api.createCreditRequest as jest.Mock).mockResolvedValue({ status: 200 });

    const { result } = renderHook(() => hooks.useCreditRequestData('card-123'), { wrapper });

    await act(async () => {
      result.current.createCreditRequest(event);
    });

    await waitFor(() => {
      expect(result.current.requestData).toBeUndefined();
    });
  });
});
