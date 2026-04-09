import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
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

describe('API', () => {
  it('uses the expected URL to call the endpoint', async () => {
    await useProgramsListData();

    expect(getAuthenticatedHttpClient).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith(`${mockLMSBaseUrl}/api/dashboard/v0/programs/`);
  });
});
