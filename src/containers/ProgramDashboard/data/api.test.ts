import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProgramsListData } from './api';

const mockGet = jest.fn(() => ({
  data: {},
}));
const mockLMSBaseUrl = 'http://test-lms-base-url';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(() => ({
    get: mockGet,
  })),
}));
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: mockLMSBaseUrl,
  })),
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('API', () => {
  it('uses the expected URL to call the endpoint', async () => {
    const queryClient = createTestQueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );

    renderHook(() => useProgramsListData(), { wrapper });

    expect(getAuthenticatedHttpClient).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith(
      `${mockLMSBaseUrl}/api/dashboard/v0/programs/`,
    );
  });
});
